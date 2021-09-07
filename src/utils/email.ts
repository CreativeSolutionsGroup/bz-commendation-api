import { createTransport } from "nodemailer";
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
export const emailDirector = async (commendation: Commendation) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: "bzcommendations@cedarville.edu",
        subject: "You have received a new BZ commendation!",
        text: commendation.message
    }

    let mailRes = await mail.sendMail(mailOptions);

    return mailRes;
}

export const emailEmployee = async (commendation: Commendation) => {
    const mailOptions = {
        from: "bzcommendations@cedarville.edu",
        to: commendation.toEmail,
        subject: "You have received a new BZ commendation!",
        text: commendation.message
    }

    let mailRes = await mail.sendMail(mailOptions);

    return mailRes;
}