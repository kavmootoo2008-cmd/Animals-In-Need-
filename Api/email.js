
export default async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    try {
        const {
            formType,
            name,
            email,
            phone,
            subject,
            message,
            type,
            amount,
            location,
            animal,
            gender,
            condition
        } = req.body || {};

        // Get email settings from Vercel
        const apiKey = process.env.RESEND_API_KEY;
        const recipient = process.env.EMAIL_TO;
        const sender = process.env.EMAIL_FROM;

        if (!apiKey || !recipient || !sender) {
            return res.status(500).json({
                message: "Email settings are missing."
            });
        }

        // Check the form type
        if (!["contact", "donation", "rescue"].includes(formType)) {
            return res.status(400).json({
                message: "Invalid form type."
            });
        }

        // Validate name and email
        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            return res.status(400).json({
                message: "Please provide a valid name and email."
            });
        }

        let emailSubject = "";
        let emailMessage = "";

        // CONTACT FORM
        if (formType === "contact") {

            if (!phone || !subject || !message) {
                return res.status(400).json({
                    message: "Please complete all contact fields."
                });
            }

            emailSubject = "New Contact Form Message";

            emailMessage = `
New Contact Message

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}
`;
        }

        // DONATION FORM
        else if (formType === "donation") {

            if (!type || !message) {
                return res.status(400).json({
                    message: "Please complete the donation fields."
                });
            }

            emailSubject = "New Donation Enquiry";

            emailMessage = `
New Donation Enquiry

Name: ${name}
Email: ${email}
Donation Type: ${type}
Donation Amount: ${amount || "Not specified"} TTD

Message:
${message}
`;
        }

        // RESCUE FORM
        else if (formType === "rescue") {

            if (!phone || !location || !animal || !gender || !condition) {
                return res.status(400).json({
                    message: "Please complete all rescue fields."
                });
            }

            emailSubject = "New Animal Rescue Request";

            emailMessage = `
New Animal Rescue Request

Reporter Name: ${name}
Email: ${email}
Phone: ${phone}

Animal Location: ${location}
Animal Type: ${animal}
Animal Gender: ${gender}

Animal Condition:
${condition}
`;
        }

        // Send the email using Resend
        const response = await fetch(
            "https://api.resend.com/emails",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },

                body: JSON.stringify({
                    from: sender,
                    to: [recipient],
                    reply_to: email.trim(),
                    subject: emailSubject,
                    text: emailMessage
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error("Resend error:", result);

            return res.status(502).json({
                message: "Unable to send your email. Please try again."
            });
        }

        return res.status(200).json({
            message: "Your form was submitted successfully!"
        });

    } catch (error) {

        console.error("Server error:", error);

        return res.status(500).json({
            message: "Something went wrong. Please try again."
        });
    }
}
