import Commendation from "../models/commendation";
import { getEmployeeName } from "../controllers/users";
import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import dotenv from "dotenv";

dotenv.config();

const mail = createTransport({
    service: "gmail",
    auth: {
        type: 'OAUTH2',
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

/**
 * The correct way to do this may be to have a configurable "list of email addresses" that you send to.
 * This would map to a column name.
 * for example:
 * director, exec, team_members
 */
export const email = async (commendation: Commendation) => {
    let senderName = await getEmployeeName(commendation.fromEmail); 
    const msg = {
        to: commendation.toEmail,
        from: process.env.EMAIL,
        subject: `[bz_commendations] ${senderName} sent you a BZ Commendation`,
        text: `${commendation.message}\n\n-${senderName}`,
        html: `<div>
                    <img width="500" height="100" src="http://drive.google.com/uc?export=view&id=1hReQjYUGqZXHK_WT1Q7TAhFbx4jVWa4z"/>
                    <div style="display: flex; flex-direction: column; margin-top: 20px">
                        <p style="margin-left: 40px">${commendation.message}</p>
                        <div style="margin-left: 20px">
                            <h3>- ${senderName}</h3>
                        </div>
                        <a style="margin-left: auto; margin-right: auto"href="https://bz-cedarville.com/commendations">View your Commendations</a>
                    </div>
                </div>`,
    } as MailOptions;
    let mailRes = await mail.sendMail(msg);

    return mailRes;
}

export const emailOthers = async (commendation: Commendation) => {
    let senderName = await getEmployeeName(commendation.fromEmail); 
    let userName = await getEmployeeName(commendation.toEmail); 
    const msg = {
        to: commendation.otherEmails,
        from: process.env.EMAIL,
        subject: `[bz_commendations] ${userName} has received a BZ Commendation`,
        text: `${commendation.message}\n\n-${senderName}`,
        html: `<div>
                    <img width="500" height="100" src="http://drive.google.com/uc?export=view&id=1hReQjYUGqZXHK_WT1Q7TAhFbx4jVWa4z"/>
                    <div style="margin-top: 20px">
                        <div style="margin-left: 20px">
                            <h2>${userName} received a new Commendation</h2>
                        </div>
                        <p style="margin-left: 40px; white-space: pre-line">${commendation.message}</p>
                        <div style="margin-left: 20px">
                            <h3>- ${senderName}</h3>
                        </div>
                    </div>
                    <div style="margin-left: auto; margin-right: auto">
                        <div style="display: flex">
                            <a style="margin-right: 10px" href="mailto:${commendation.fromEmail}">Email Sender</a>
                            ${" "}
                            <a href="mailto:${commendation.toEmail}">Email Recipient</a>
                        </div>
                    </div>
                </div>`,
    } as MailOptions;
    let mailRes = await mail.sendMail(msg)
    .catch((error) => {
        console.error(error)
    });

    return mailRes;
}