import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

interface SendMailParams {
  email: string;
  emailType: string;
  userId: string;
}

export const sendMail = async ({
  email,
  emailType,
  userId
}: SendMailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 36000
      });
    } else if (emailType === 'RESET_PASSWORD') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 36000
      });
    }
    const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      secure: false, // use SSL
      auth: {
        user: '1a2b3c4d5e6f7g',
        pass: '1a2b3c4d5e6f7g'
      }
    });

    const mailOptions = {
      from: 'mohdshaoib786@email.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Password',
      html:
        emailType === 'VERIFY'
          ? `<a href="http://localhost:3000/verifyemail/${hashedToken}">Click here to verify your email or copy and paste the link below in the browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a>`
          : `<a href="http://localhost:3000/reset-password/${hashedToken}">Click here to reset your password copy and paste the link below in the browser. <br> ${process.env.DOMAIN}/reset-password?token=${hashedToken}</a>`
    };
    transporter.sendMail(
      mailOptions,
      function (error: Error | null, info: nodemailer.SentMessageInfo) {
        if (error) {
          console.log('error', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }
    );
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};
