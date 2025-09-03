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
          
          // Check for obviously fake numbers (all same digit, sequential, etc.)
          const isTestNumber = (digits) => {
            if (!digits || digits.length < 10) return false;
            // Check for all same digit (1111111111, 0000000000, etc.)
            if (/^(\d)\1+$/.test(digits)) return true;
            // Check for sequential (1234567890, 0123456789)
            if (digits === '1234567890' || digits === '0123456789') return true;
            // Check for patterns like 5555555555
            if (digits === '5555555555' || digits === '9999999999') return true;
            return false;
          };
          
          if (isTestNumber(digitsOnly)) {
            return new Response(JSON.stringify({ 
              error: 'Please provide a valid phone number, not a test number' 
            }), {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': corsOrigin
              }
            });
          }
          
          if (sanitizedData.phone.startsWith('+')) {
            // Keep as-is if it already starts with + (international format)
            formattedPhone = sanitizedData.phone;
          } else if (digitsOnly.length === 10) {
            // 10 digits - assume North American without country code
            // Check if it's a valid North American number (area code can't start with 0 or 1)
            const areaCode = digitsOnly.substring(0, 3);
            if (areaCode[0] === '0' || areaCode[0] === '1') {
              return new Response(JSON.stringify({ 
                error: 'Invalid phone number. North American area codes cannot start with 0 or 1' 
              }), {
                status: 400,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': corsOrigin
                }
              });
            }
            // Format as +1AAABBBCCCC
            formattedPhone = `+1${digitsOnly}`;
          } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
            // 11 digits starting with 1 - North American with country code
            const areaCode = digitsOnly.substring(1, 4);
            if (areaCode[0] === '0' || areaCode[0] === '1') {
              return new Response(JSON.stringify({ 
                error: 'Invalid phone number. North American area codes cannot start with 0 or 1' 
              }), {
                status: 400,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': corsOrigin
                }
              });
            }
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
          console.error('Attio API error:', {
            status: attioResponse.status,
            statusText: attioResponse.statusText,
            error: errorText,
            requestData: {
              phone: formattedPhone,
              email: sanitizedData.email,
              name: sanitizedData.name
            }
          });
          
          // Try to parse error response for more details
          let errorMessage = 'Failed to save to Attio';
          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.message) {
              errorMessage = errorJson.message;
            } else if (errorJson.error) {
              errorMessage = errorJson.error;
            }
          } catch (e) {
            // If not JSON, use the text directly if it's not too long
            if (errorText && errorText.length < 200) {
              errorMessage = errorText;
            }
          }
          
          throw new Error(errorMessage);
        }

        const person = await attioResponse.json();
        
        // Check if person is already in the User Interviews list
        console.log('Checking if person is already in list. Person ID:', person.data.id);
        const checkListResponse = await fetch(`https://api.attio.com/v2/lists/5612c985-ac73-40bf-a8be-28723dc019f8/entries?filter[parent_record_id]=${person.data.id.record_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${env.ATTIO_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        let shouldAddToList = true;
        if (checkListResponse.ok) {
          const existingEntries = await checkListResponse.json();
          if (existingEntries.data && existingEntries.data.length > 0) {
            console.log('Person already in list, skipping add');
            shouldAddToList = false;
          }
        }
        
        // Only add to list if not already present
        if (shouldAddToList) {
          console.log('Adding person to User Interviews list');
          const listResponse = await fetch('https://api.attio.com/v2/lists/5612c985-ac73-40bf-a8be-28723dc019f8/entries', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.ATTIO_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              data: {
                parent_object: 'people',
                parent_record_id: person.data.id.record_id,
                entry_values: {
                  // Stage attribute - set to "Interview Requested"
                  '6bcb51ba-77e2-433b-b289-a0667c8b1961': [{ status: 'Interview Requested' }]
                }
              }
            })
          });

          if (!listResponse.ok) {
            const errorText = await listResponse.text();
            console.error('Failed to add to list:', {
              status: listResponse.status,
              statusText: listResponse.statusText,
              error: errorText,
              personId: person.data.id
            });
          } else {
            const listEntry = await listResponse.json();
            console.log('Successfully added to list:', listEntry);
          }
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
          console.error('Attio API error (newsletter):', {
            status: attioResponse.status,
            statusText: attioResponse.statusText,
            error: errorText,
            requestData: {
              email: sanitizedEmail
            }
          });
          
          // Try to parse error response for more details
          let errorMessage = 'Failed to save to Attio';
          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.message) {
              errorMessage = errorJson.message;
            } else if (errorJson.error) {
              errorMessage = errorJson.error;
            }
          } catch (e) {
            // If not JSON, use the text directly if it's not too long
            if (errorText && errorText.length < 200) {
              errorMessage = errorText;
            }
          }
          
          throw new Error(errorMessage);
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