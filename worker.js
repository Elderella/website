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
        
        // Create or update contact in Attio
        const attioResponse = await fetch('https://api.attio.com/v2/objects/people', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.ATTIO_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              values: {
                name: [{ value: sanitizedData.name }],
                email_addresses: [{ email_address: sanitizedData.email }],
                phone_numbers: sanitizedData.phone ? [{ phone_number: sanitizedData.phone }] : [],
                // Caregiving Situation attribute
                'ec1acf24-4dcc-4ec4-8b0c-5dd24411a52e': sanitizedData.situation ? [{ value: sanitizedData.situation }] : [],
                // Stage attribute - set to "Interview Requested"
                '6bcb51ba-77e2-433b-b289-a0667c8b1961': [{ value: 'Interview Requested' }]
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
        
        const attioResponse = await fetch('https://api.attio.com/v2/objects/people', {
          method: 'POST',
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