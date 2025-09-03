export default {
  async fetch(request, env, ctx) {
    // Get origin from request
    const origin = request.headers.get('Origin');
    const allowedOrigins = ['https://elderella.com', 'https://elderella.github.io', 'http://localhost:8000'];
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': corsOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    const url = new URL(request.url);
    
    // Handle interview form submission
    if (url.pathname === '/api/interview' && request.method === 'POST') {
      try {
        const data = await request.json();
        
        // Validate required fields
        if (!data.name || !data.email) {
          return new Response(JSON.stringify({ 
            error: 'Name and email are required fields' 
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': corsOrigin
            }
          });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          return new Response(JSON.stringify({ 
            error: 'Please provide a valid email address' 
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': corsOrigin
            }
          });
        }
        
        // Sanitize inputs (basic XSS prevention)
        const sanitize = (str) => str ? String(str).trim().slice(0, 500) : '';
        const sanitizedData = {
          name: sanitize(data.name),
          email: sanitize(data.email).toLowerCase(),
          phone: sanitize(data.phone),
          situation: sanitize(data.situation)
        };
        
        // Intelligent name parsing
        const nameParts = sanitizedData.name.trim().split(/\s+/); // Split on any whitespace
        let firstName = '';
        let lastName = '';
        
        if (nameParts.length === 1) {
          // Single name - treat as first name
          firstName = nameParts[0];
          lastName = '';
        } else if (nameParts.length === 2) {
          // Two parts - simple first and last
          firstName = nameParts[0];
          lastName = nameParts[1];
        } else {
          // Three or more parts - everything except last is first name
          // This handles "Mary Jane Smith" as firstName: "Mary Jane", lastName: "Smith"
          lastName = nameParts[nameParts.length - 1];
          firstName = nameParts.slice(0, -1).join(' ');
        }
        
        // Format phone number properly
        let formattedPhone = null;
        if (sanitizedData.phone) {
          // Remove all non-digits for processing
          const digitsOnly = sanitizedData.phone.replace(/\D/g, '');
          
          if (sanitizedData.phone.startsWith('+')) {
            // Keep as-is if it already starts with + (international format)
            formattedPhone = sanitizedData.phone;
          } else if (digitsOnly.length === 10) {
            // 10 digits - assume North American without country code
            // Format as +1AAABBBCCCC
            formattedPhone = `+1${digitsOnly}`;
          } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
            // 11 digits starting with 1 - North American with country code
            formattedPhone = `+${digitsOnly}`;
          } else if (digitsOnly.length > 0) {
            // Invalid phone format - return error to user
            return new Response(JSON.stringify({ 
              error: 'Please provide a valid 10-digit phone number (e.g., 555-123-4567)' 
            }), {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': corsOrigin
              }
            });
          }
          console.log('Phone formatting:', { 
            original: sanitizedData.phone, 
            digitsOnly: digitsOnly,
            formatted: formattedPhone 
          });
        }
        
        // Assert (create or update) contact in Attio - using email as matching attribute
        const attioResponse = await fetch('https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${env.ATTIO_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              values: {
                name: [{ 
                  first_name: firstName,
                  last_name: lastName,
                  full_name: sanitizedData.name
                }],
                email_addresses: [{ email_address: sanitizedData.email }],
                phone_numbers: formattedPhone ? [{ 
                  original_phone_number: formattedPhone
                }] : [],
                // Caregiving Situation attribute
                'ec1acf24-4dcc-4ec4-8b0c-5dd24411a52e': sanitizedData.situation ? [{ value: sanitizedData.situation }] : []
              }
            }
          })
        });

        if (!attioResponse.ok) {
          const errorText = await attioResponse.text();
          console.error('Attio API error:', errorText);
          throw new Error('Failed to save to Attio');
        }

        const person = await attioResponse.json();
        
        // Add to User Interviews list
        const listResponse = await fetch('https://api.attio.com/v2/lists/5612c985-ac73-40bf-a8be-28723dc019f8/entries', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.ATTIO_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              parent_object: 'people',
              parent_record_id: person.data.id
            }
          })
        });

        if (!listResponse.ok) {
          const errorText = await listResponse.text();
          console.error('Failed to add to list:', errorText);
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin
          }
        });
      } catch (error) {
        console.error('Error in interview handler:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin
          }
        });
      }
    }

    // Handle newsletter signup
    if (url.pathname === '/api/newsletter' && request.method === 'POST') {
      try {
        const data = await request.json();
        
        // Validate email
        if (!data.email) {
          return new Response(JSON.stringify({ 
            error: 'Email is required' 
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': corsOrigin
            }
          });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          return new Response(JSON.stringify({ 
            error: 'Please provide a valid email address' 
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': corsOrigin
            }
          });
        }
        
        const sanitizedEmail = data.email.trim().toLowerCase();
        
        const attioResponse = await fetch('https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${env.ATTIO_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              values: {
                email_addresses: [{ email_address: sanitizedEmail }]
              }
            }
          })
        });

        if (!attioResponse.ok) {
          const errorText = await attioResponse.text();
          console.error('Attio API error:', errorText);
          throw new Error('Failed to save to Attio');
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin
          }
        });
      } catch (error) {
        console.error('Error in newsletter handler:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin
          }
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};