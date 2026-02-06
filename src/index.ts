export default {
    async fetch(request: Request, env: any) {
        const url = new URL(request.url);

        try {
            // API: Send Email via Resend
            if (url.pathname === '/api/send-email' && request.method === 'POST') {
                const data = await request.json() as any;
                const { name, email, service, message, fileLinks, details } = data;
                const isQuotation = service && service.includes('Quotation');

                // Professional Email Styling
                const emailStyles = `font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;`;
                const headerStyles = `background: #007bff; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;`;

                const fileLinksHtml = fileLinks && fileLinks.length > 0
                    ? `<div style="margin-top:20px;padding:15px;background:#f8f9fa;"><h3>📄 Documents:</h3><ul>${fileLinks.map((link: string) => `<li><a href="${link}">Download</a></li>`).join('')}</ul></div>`
                    : '';

                const htmlBody = `
                    <div style="${emailStyles}">
                        <div style="${headerStyles}"><h2>${isQuotation ? 'New Quotation' : 'New Inquiry'}</h2></div>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Service:</strong> ${service || 'General'}</p>
                        ${details ? `<p><strong>Details:</strong><br/>${details}</p>` : ''}
                        <p><strong>Message:</strong></p><p>${message || 'None'}</p>
                        ${fileLinksHtml}
                    </div>
                `;

                const resendResponse = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        from: 'Damascus Translation <onboarding@resend.dev>',
                        to: ['jalalaljabri63@gmail.com'],
                        subject: `${isQuotation ? '⚡ QUOTE' : '✉️ CONTACT'}: ${name}`,
                        html: htmlBody,
                    }),
                });

                const result = await resendResponse.json() as any;
                return new Response(JSON.stringify(result), {
                    status: resendResponse.ok ? 200 : 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // Normal Static Asset Fetching
            let response = await env.ASSETS.fetch(request);

            // SPA Fallback: If 404 on a page route, serve index.html
            if (response.status === 404 && !url.pathname.includes('.')) {
                const indexRequest = new Request(new URL('/index.html', request.url), request);
                response = await env.ASSETS.fetch(indexRequest);
            }

            return response;
        } catch (err: any) {
            // EXPOSE THE ERROR: This will show up in the browser instead of 1011
            return new Response(`Worker Critical Error: ${err.message}\n${err.stack}`, {
                status: 500,
                headers: { 'Content-Type': 'text/plain' }
            });
        }
    }
};
