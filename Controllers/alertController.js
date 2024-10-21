import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const sendAlertEmail = async (req, res) => {
    const {email,message} = req.body;
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Campaign Alert',
            text: message
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send alert email' });
        
    }
}