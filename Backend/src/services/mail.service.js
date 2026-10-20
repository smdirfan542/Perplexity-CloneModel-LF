
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});

transporter.verify().then(()=>{console.log('mail service is ready to use')}).catch((err)=>{console.log(err)})

export async function sendEmail({ to, subject, text, html }) {
    console.log("Email recipient:", to);

    if (!to) {
        throw new Error("Recipient email is missing");
    }

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        text,
        html,
    };

    return await transporter.sendMail(mailOptions);
}
