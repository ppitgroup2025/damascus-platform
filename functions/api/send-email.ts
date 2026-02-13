export const onRequestPost = async ({ request, env }: { request: Request; env: { RESEND_API_KEY: string } }) => {
    try {
        const data = await request.json() as any;
        const { name, email, service, message, fileLinks, details } = data;

        const isQuotation = service && (service.includes('Quotation') || service.includes('quotation'));

        if (!env.RESEND_API_KEY) {
            throw new Error('Missing RESEND_API_KEY in environment variables');
        }

        // Professional Email Styling
        const emailStyles = `font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;`;
        const headerStyles = `background: #007bff; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;`;

        const fileLinksHtml = fileLinks && fileLinks.length > 0
            ? `<div style="margin-top:20px;padding:15px;background:#f8f9fa;"><h3>📄 Uploaded Documents:</h3><ul>${fileLinks.map((link: string) => `<li><a href="${link}" style="color: #007bff;">Download File</a></li>`).join('')}</ul></div>`
            : '';

        const htmlBody = `
            <div style="${emailStyles}">
                <div style="${headerStyles}">
                    <h2 style="margin: 0;">${isQuotation ? 'New Quotation Request' : 'New Contact Inquiry'}</h2>
                </div>
                <p><strong>Customer Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Service:</strong> ${service || 'General'}</p>
                ${details ? `<p><strong>Details:</strong><br/>${details}</p>` : ''}
                <p><strong>Message:</strong></p>
                <div style="background: #fff; border-left: 4px solid #007bff; padding: 10px 15px; font-style: italic;">
                    ${message || 'No message provided.'}
                </div>
                ${fileLinksHtml}
                <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                <p style="font-size: 0.8rem; color: #777; text-align: center;">
                    This is an automated notification from the Damascus Translation website.
                </p>
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
                to: ['damascustranslation@gmail.com'],
                subject: `${isQuotation ? '⚡ QUOTE' : '✉️ CONTACT'}: ${name}`,
                html: htmlBody,
            }),
        });

        const result = await resendResponse.json() as any;
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
};
