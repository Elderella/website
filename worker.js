// Attio attribute IDs (extracted as constants for maintainability)
const ATTIO_ATTRIBUTES = {
  CAREGIVING_SITUATION: 'ec1acf24-4dcc-4ec4-8b0c-5dd24411a52e',
  CONSENT_TYPE: '08555ec8-4747-406e-8002-e615e080d211',         // Options: Express, Implied
  CONSENT_TIMESTAMP: '3098cd83-0003-4a38-b670-9c9d19bb119b',
  CONSENT_SOURCE: '634ce37c-0a48-4e2e-923d-d67c338a6ce3'       // Options: Marketing Signup Form, etc.
};

// Improved input sanitization to prevent XSS
function sanitizeInput(str) {
  if (!str) return '';
  return String(str)
    .trim()
    .replace(/[<>'"&]/g, (char) => {
      const escapeMap = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;' };
      return escapeMap[char];
    });
}

// Sanitize context to avoid exposing sensitive data
function sanitizeContext(context) {
  const sensitiveKeys = ['password', 'token', 'key', 'secret', 'api_key', 'authorization', 'webhook'];
  const sanitized = JSON.parse(JSON.stringify(context)); // Deep clone
  
  function sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    
    for (const key in obj) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        obj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object') {
        sanitizeObject(obj[key]);
      }
    }
    return obj;
  }
  
  return sanitizeObject(sanitized);
}

// Smart truncate for stack traces - keep beginning and end
function truncateStackTrace(stack, maxLength = 2000) {
  if (!stack || stack.length <= maxLength) return stack;
  
  const keepStart = Math.floor(maxLength * 0.6);
  const keepEnd = Math.floor(maxLength * 0.35);
  
  return stack.substring(0, keepStart) + 
         '\n\n... [truncated ' + (stack.length - maxLength) + ' chars] ...\n\n' + 
         stack.substring(stack.length - keepEnd);
}

// Send error alerts to #alerts channel
async function sendErrorAlert(error, context, env) {
  if (!env.ALERTS_WEBHOOK_URL) {
    console.error('ALERTS_WEBHOOK_URL not configured, cannot send error alert:', error);
    return;
  }
  
  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Toronto',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const message = {
      text: `🚨 Website Worker Error: ${error.message}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🚨 Website Worker Error',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Error:*\n${error.message}`
            },
            {
              type: 'mrkdwn',
              text: `*Time:*\n${timestamp}`
            }
          ]
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Context:*\n\`\`\`${JSON.stringify(sanitizeContext(context), null, 2)}\`\`\``
          }
        }
      ]
    };

    if (error.stack) {
      message.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Stack Trace:*\n\`\`\`${truncateStackTrace(error.stack, 1500)}\`\`\``
        }
      });
    }

    await fetch(env.ALERTS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
  } catch (alertError) {
    // If we can't send alerts, at least log it
    console.error('Failed to send error alert:', alertError, 'Original error:', error);
  }
}

// Send notification to Slack when someone registers for an interview
async function sendSlackNotification(formData, isNewToList, env) {
  if (!env.SLACK_WEBHOOK_URL) {
    console.log('Slack webhook not configured, skipping notification');
    return;
  }

  try {
    // Format interviewer preference text
    const interviewerText = 
      formData.interviewer === 'jacqui' ? 'Jacqui Murphy' :
      formData.interviewer === 'mike' ? 'Mike Kirkup' :
      'No preference';

    // Create rich Slack message using Block Kit
    const message = {
      text: '🎤 New User Interview Registration',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎤 New User Interview Registration',
            emoji: true
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Name:*\n${formData.name}`
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${formData.email}`
            }
          ]
        }
      ]
    };

    // Add phone if provided
    if (formData.phone) {
      message.blocks.push({
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Phone:*\n${formData.phone}`
          },
          {
            type: 'mrkdwn',
            text: `*Interviewer Preference:*\n${interviewerText}`
          }
        ]
      });
    } else {
      message.blocks.push({
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Interviewer Preference:*\n${interviewerText}`
          },
          {
            type: 'mrkdwn',
            text: `*Status:*\n${isNewToList ? '✅ New to interview list' : '🔄 Already in list'}`
          }
        ]
      });
    }

    // Add caregiving situation if provided
    if (formData.situation) {
      message.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Caregiving Situation:*\n${formData.situation}`
        }
      });
    }

    // Add status and timestamp
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Toronto',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    if (formData.phone) {
      message.blocks.push({
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Status:*\n${isNewToList ? '✅ New to interview list' : '🔄 Already in list'}`
          },
          {
            type: 'mrkdwn',
            text: `*Registered:*\n${timestamp}`
          }
        ]
      });
    } else {
      message.blocks.push({
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Registered:*\n${timestamp}`
          }
        ]
      });
    }

    // Add divider
    message.blocks.push({ type: 'divider' });

    // Send to Slack
    const slackResponse = await fetch(env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    if (!slackResponse.ok) {
      const errorText = await slackResponse.text();
      console.error('Slack notification failed:', slackResponse.status, errorText);
      throw new Error(`Slack notification failed with status ${slackResponse.status}: ${errorText}`);
    } else {
      console.log('Slack notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
    // Re-throw so the caller can handle and alert
    throw error;
  }
}

export default {
  async fetch(request, env, ctx) {
    // Get origin from request
    const origin = request.headers.get('Origin');
    const allowedOrigins = ['https://elderella.com', 'https://www.elderella.com', 'https://elderella.github.io', 'http://localhost:8000', 'http://localhost:8080'];
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

    // Log incoming API requests to catch early failures
    if (url.pathname === '/api/interview' || url.pathname === '/api/newsletter') {
      console.log('API request received:', {
        method: request.method,
        path: url.pathname,
        origin: request.headers.get('Origin'),
        hasBody: request.headers.get('Content-Length') > 0,
        userAgent: request.headers.get('User-Agent')?.includes('iPhone') ? 'iPhone' : 'Other'
      });
    }

    // Handle interview form submission
    if (url.pathname === '/api/interview' && request.method === 'POST') {
      try {
        const data = await request.json();

        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email) {
          return new Response(JSON.stringify({
            error: 'First name, last name, and email are required fields'
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

        // Sanitize inputs
        const sanitizedData = {
          firstName: sanitizeInput(data.firstName),
          lastName: sanitizeInput(data.lastName),
          email: sanitizeInput(data.email).toLowerCase(),
          phone: sanitizeInput(data.phone),
          situation: sanitizeInput(data.situation),
          newsletter: data.newsletter === true
        };

        // Build full name for display/Slack
        const fullName = `${sanitizedData.firstName} ${sanitizedData.lastName}`.trim();
        
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
            originalLength: sanitizedData.phone?.length,
            digitsOnlyLength: digitsOnly?.length,
            formatted: formattedPhone ? 'formatted successfully' : 'no phone'
          });
        }
        
        // Build Attio values object
        const attioValues = {
          name: [{
            first_name: sanitizedData.firstName,
            last_name: sanitizedData.lastName,
            full_name: fullName
          }],
          email_addresses: [{ email_address: sanitizedData.email }],
          phone_numbers: formattedPhone ? [{
            original_phone_number: formattedPhone
          }] : [],
          [ATTIO_ATTRIBUTES.CAREGIVING_SITUATION]: sanitizedData.situation ? [{ value: sanitizedData.situation }] : []
        };

        // Add newsletter consent fields if opted in
        if (sanitizedData.newsletter) {
          attioValues[ATTIO_ATTRIBUTES.CONSENT_TYPE] = [{ option: 'Express' }];
          attioValues[ATTIO_ATTRIBUTES.CONSENT_TIMESTAMP] = [{ value: new Date().toISOString() }];
          attioValues[ATTIO_ATTRIBUTES.CONSENT_SOURCE] = [{ option: 'Marketing Signup Form' }];
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
              values: attioValues
            }
          })
        });

        if (!attioResponse.ok) {
          const errorText = await attioResponse.text();
          const errorDetails = {
            status: attioResponse.status,
            statusText: attioResponse.statusText,
            error: errorText,
            requestData: {
              phone: formattedPhone,
              email: sanitizedData.email,
              name: fullName
            }
          };

          console.error('Attio API error:', {
            status: attioResponse.status,
            statusText: attioResponse.statusText,
            email: sanitizedData.email,
            name: fullName,
            errorPreview: errorText ? errorText.substring(0, 200) : null
          });

          // Send alert for Attio failures
          await sendErrorAlert(
            new Error(`Attio API failed with status ${attioResponse.status}: ${errorText}`),
            {
              operation: 'Create/Update Person',
              email: sanitizedData.email,
              name: fullName,
              status: attioResponse.status
            },
            env
          );
          
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
        console.log('Checking if person is already in list');
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
                  // Stage attribute - set to "Interview Scheduled"
                  '6bcb51ba-77e2-433b-b289-a0667c8b1961': [{ status: 'Interview Scheduled' }]
                }
              }
            })
          });

          if (!listResponse.ok) {
            const errorText = await listResponse.text();
            const errorDetails = {
              status: listResponse.status,
              statusText: listResponse.statusText,
              error: errorText,
              personId: person.data.id
            };
            
            console.error('Failed to add to list:', {
              status: listResponse.status,
              statusText: listResponse.statusText,
              email: sanitizedData.email,
              name: fullName
            });

            // Send alert for list add failures
            await sendErrorAlert(
              new Error(`Failed to add to User Interviews list: ${listResponse.status}`),
              {
                operation: 'Add to User Interviews List',
                email: sanitizedData.email,
                personId: person.data.id.record_id,
                status: listResponse.status,
                error: errorText
              },
              env
            );
          } else {
            const listEntry = await listResponse.json();
            console.log('Successfully added to list');
          }
        }

        // Send Slack notification
        // Include interviewer preference from original form data
        const slackData = {
          firstName: sanitizedData.firstName,
          lastName: sanitizedData.lastName,
          name: fullName,
          email: sanitizedData.email,
          phone: formattedPhone || sanitizedData.phone,
          situation: sanitizedData.situation,
          interviewer: data.interviewer // Pass through the original interviewer preference
        };

        try {
          await sendSlackNotification(slackData, shouldAddToList, env);
        } catch (slackError) {
          // Send alert for Slack notification failures
          await sendErrorAlert(
            slackError,
            {
              operation: 'Send Interview Notification',
              email: sanitizedData.email,
              name: fullName
            },
            env
          );
          // Don't throw - we already saved to Attio
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin
          }
        });
      } catch (error) {
        console.error('Error in interview handler:', error);

        // Get email from sanitizedData if available, otherwise try data, otherwise 'unknown'
        let errorEmail = 'unknown';
        try {
          errorEmail = sanitizedData?.email || data?.email || 'unknown';
        } catch (e) {
          // If even accessing data fails, keep as 'unknown'
        }

        // Send alert for any uncaught errors
        await sendErrorAlert(
          error,
          {
            operation: 'Interview Handler',
            path: url.pathname,
            email: errorEmail
          },
          env
        );

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

        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email) {
          return new Response(JSON.stringify({
            error: 'First name, last name, and email are required'
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

        // Sanitize inputs
        const sanitizedData = {
          firstName: sanitizeInput(data.firstName),
          lastName: sanitizeInput(data.lastName),
          email: sanitizeInput(data.email).toLowerCase()
        };

        const fullName = `${sanitizedData.firstName} ${sanitizedData.lastName}`.trim();

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
                  first_name: sanitizedData.firstName,
                  last_name: sanitizedData.lastName,
                  full_name: fullName
                }],
                email_addresses: [{ email_address: sanitizedData.email }],
                [ATTIO_ATTRIBUTES.CONSENT_TYPE]: [{ option: 'Express' }],
                [ATTIO_ATTRIBUTES.CONSENT_TIMESTAMP]: [{ value: new Date().toISOString() }],
                [ATTIO_ATTRIBUTES.CONSENT_SOURCE]: [{ option: 'Marketing Signup Form' }]
              }
            }
          })
        });

        if (!attioResponse.ok) {
          const errorText = await attioResponse.text();
          const errorDetails = {
            status: attioResponse.status,
            statusText: attioResponse.statusText,
            error: errorText,
            requestData: {
              email: sanitizedData.email,
              name: fullName
            }
          };

          console.error('Attio API error (newsletter):', {
            status: attioResponse.status,
            statusText: attioResponse.statusText,
            email: sanitizedData.email,
            name: fullName,
            errorPreview: errorText ? errorText.substring(0, 200) : null
          });

          // Send alert for newsletter Attio failures
          await sendErrorAlert(
            new Error(`Newsletter Attio API failed with status ${attioResponse.status}: ${errorText}`),
            {
              operation: 'Newsletter - Create/Update Person',
              email: sanitizedData.email,
              name: fullName,
              status: attioResponse.status
            },
            env
          );
          
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

        // Get email from sanitizedData if available, otherwise try data, otherwise 'unknown'
        let errorEmail = 'unknown';
        try {
          errorEmail = sanitizedData?.email || data?.email || 'unknown';
        } catch (e) {
          // If even accessing data fails, keep as 'unknown'
        }

        // Send alert for newsletter signup failures
        await sendErrorAlert(
          error,
          {
            operation: 'Newsletter Signup',
            path: url.pathname,
            email: errorEmail
          },
          env
        );

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