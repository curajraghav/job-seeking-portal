import nodemailer from 'nodemailer';

async function sendMail(name, email) {
    // Create a reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP,
        },
    });

    // Email Sending
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Application Confirmation',
        text: `Hey ${name}, thank you for applying for the job. Your application has been received.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email Sent:', info.response);
    } catch (error) {
        console.error('Error Sending Email:', error);
    }
}

export default sendMail;
