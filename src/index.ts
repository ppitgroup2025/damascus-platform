export default {
    async fetch(request: Request, env: any) {
        const url = new URL(request.url);

        // API: Send Email via Resend
        if (url.pathname === '/api/send-email' && request.method === 'POST') {
            try {
                const data = await request.json() as any;
                const { name, email, service, message, fileLinks } = data;

                // For the quotation form, include file links formatted nicely
                const fileLinksHtml = fileLinks && fileLinks.length > 0
                    ? `<h3>Uploaded Files:</h3><ul>${fileLinks.map((link: string) => `<li><a href="${link}">${link}</a></li>`).join('')}</ul>`
                    : '';

                const resendResponse = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: 'Damascus Translation <onboarding@resend.dev>',
                        to: ['jalalaljabri63@gmail.com'], // The boss's email
                        subject: `New Request: ${service || 'General Inquiry'}`,
                        html: `
                            <h2>New Submission from Damascus Website</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Service:</strong> ${service || 'Contact Form'}</p>
                            <p><strong>Message:</strong></p>
                            <p>${message}</p>
                            ${fileLinksHtml}
                        `,
                    }),
                });

                const result = await resendResponse.json();
                return new Response(JSON.stringify(result), {
                    status: resendResponse.ok ? 200 : 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (error: any) {
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        const response = await env.ASSETS.fetch(request);

        // If the request is for a page (no file extension) and returns 404, 
        // serve the index.html content to support SPA routing.
        if (response.status === 404 && !url.pathname.split('/').pop()?.includes('.')) {
            // Fetch the index.html explicitly
            const indexResponse = await env.ASSETS.fetch(new URL('/index.html', request.url));

            // Return index.html content but keep the original 404 URL in the browser
            // (React Router will then handle the path)
            return new Response(indexResponse.body, {
                ...indexResponse,
                status: 200 // Force 200 so the browser/router treats it as a valid page
            });
        }

        return response;
    }
};
