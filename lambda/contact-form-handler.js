const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' }); // Change region if needed

exports.handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        // Validate input
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Email parameters
        const params = {
            Source: 'wani.lado615@gmail.com', // Your verified email
            Destination: {
                ToAddresses: ['wani.lado615@gmail.com'] // Where to send the message
            },
            Message: {
                Subject: {
                    Data: `Portfolio Contact: ${name}`
                },
                Body: {
                    Text: {
                        Data: `New contact form submission from your portfolio:

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio contact form at cloudwani.tech`
                    },
                    Html: {
                        Data: `
                            <h2>New Contact Form Submission</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <h3>Message:</h3>
                            <p>${message.replace(/\n/g, '<br>')}</p>
                            <hr>
                            <p style="color: #666; font-size: 12px;">This message was sent from your portfolio contact form at cloudwani.tech</p>
                        `
                    }
                }
            },
            ReplyToAddresses: [email] // Allows you to reply directly to the sender
        };

        // Send email
        await ses.sendEmail(params).promise();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Email sent successfully!' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Failed to send email' })
        };
    }
};
