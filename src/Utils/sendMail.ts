import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or use another service like 'Yahoo', 'Outlook', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
    },
});

export const sendOTP = async (email: string, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `
            <div style="text-align: center;">
                <img src="https://yourdomain.com/desireLogo.png" alt="Desire Logo" style="width: 300px; height: 100px; object-fit: contain; margin-right: 8px;" />
                <h1>Your OTP Code</h1>
                <p style="font-size: 16px;">Your OTP code is <strong>${otp}</strong></p>
                <p style="font-size: 14px;">This OTP is valid for the next 5 minutes.</p>
                <p style="font-size: 14px;">Thank you,<br>Desire Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error : any) {
        console.log(error.message);
        throw new Error('Failed to send OTP');
    }
};


export default sendOTP