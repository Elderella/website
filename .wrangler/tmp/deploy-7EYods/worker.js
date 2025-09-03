var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var worker_default = {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin");
    const allowedOrigins = ["https://elderella.com", "https://elderella.github.io", "http://localhost:8000"];
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": corsOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
    const url = new URL(request.url);
    if (url.pathname === "/api/interview" && request.method === "POST") {
      try {
        const data = await request.json();
        if (!data.name || !data.email) {
          return new Response(JSON.stringify({
            error: "Name and email are required fields"
          }), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": corsOrigin
            }
          });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          return new Response(JSON.stringify({
            error: "Please provide a valid email address"
          }), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": corsOrigin
            }
          });
        }
        const sanitize = /* @__PURE__ */ __name((str) => str ? String(str).trim().slice(0, 500) : "", "sanitize");
        const sanitizedData = {
          name: sanitize(data.name),
          email: sanitize(data.email).toLowerCase(),
          phone: sanitize(data.phone),
          situation: sanitize(data.situation)
        };
        const nameParts = sanitizedData.name.trim().split(/\s+/);
        let firstName = "";
        let lastName = "";
        if (nameParts.length === 1) {
          firstName = nameParts[0];
          lastName = "";
        } else if (nameParts.length === 2) {
          firstName = nameParts[0];
          lastName = nameParts[1];
        } else {
          lastName = nameParts[nameParts.length - 1];
          firstName = nameParts.slice(0, -1).join(" ");
        }
        const attioResponse = await fetch("https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses", {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${env.ATTIO_API_KEY}`,
            "Content-Type": "application/json"
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
                // Only include phone if it looks valid (skip for now to avoid validation errors)
                // phone_numbers: sanitizedData.phone ? [{ original_phone_number: sanitizedData.phone }] : [],
                // Caregiving Situation attribute
                "ec1acf24-4dcc-4ec4-8b0c-5dd24411a52e": sanitizedData.situation ? [{ value: sanitizedData.situation }] : []
              }
            }
          })
        });
        if (!attioResponse.ok) {
          const errorText = await attioResponse.text();
          console.error("Attio API error:", errorText);
          throw new Error("Failed to save to Attio");
        }
        const person = await attioResponse.json();
        const listResponse = await fetch("https://api.attio.com/v2/lists/5612c985-ac73-40bf-a8be-28723dc019f8/entries", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.ATTIO_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            data: {
              parent_object: "people",
              parent_record_id: person.data.id
            }
          })
        });
        if (!listResponse.ok) {
          const errorText = await listResponse.text();
          console.error("Failed to add to list:", errorText);
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": corsOrigin
          }
        });
      } catch (error) {
        console.error("Error in interview handler:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": corsOrigin
          }
        });
      }
    }
    if (url.pathname === "/api/newsletter" && request.method === "POST") {
      try {
        const data = await request.json();
        if (!data.email) {
          return new Response(JSON.stringify({
            error: "Email is required"
          }), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": corsOrigin
            }
          });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          return new Response(JSON.stringify({
            error: "Please provide a valid email address"
          }), {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": corsOrigin
            }
          });
        }
        const sanitizedEmail = data.email.trim().toLowerCase();
        const attioResponse = await fetch("https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses", {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${env.ATTIO_API_KEY}`,
            "Content-Type": "application/json"
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
          console.error("Attio API error:", errorText);
          throw new Error("Failed to save to Attio");
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": corsOrigin
          }
        });
      } catch (error) {
        console.error("Error in newsletter handler:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": corsOrigin
          }
        });
      }
    }
    return new Response("Not Found", { status: 404 });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
