import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import Commendation from "../models/commendation";

const mail = createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

/**
 * The correct way to do this may be to have a configurable "list of email addresses" that you send to.
 * This would map to a column name.
 * for example:
 * director, exec, team_members
 */
export const email = async (commendation: Commendation) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: commendation.toEmail,
        subject: `${commendation.toEmail} received a new commendation.`,
        text: commendation.message
    } as MailOptions;

    let mailRes = await mail.sendMail(mailOptions);

    return mailRes;
}