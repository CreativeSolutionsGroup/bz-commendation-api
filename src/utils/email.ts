import { getTeam, getTeamEmailList } from './../services/team';
import Commendation from "../models/commendation";
import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import dotenv from "dotenv";
import Suggestion from "../models/suggestion";
import { getUser } from "../services/users";
import Team from '../models/team';
import User from '../models/user';

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
  let fromUser = await getUser(commendation.fromUser);
  const msg = {
    to: fromUser.email,
    from: process.env.EMAIL,
    subject: `[bz_commendations] ${fromUser.email} sent you a BZ Commendation`,
    text: `${commendation.message}\n\n-${fromUser.email}`,
    html: `<div>
                    <img width="500" height="100" src="http://drive.google.com/uc?export=view&id=1hReQjYUGqZXHK_WT1Q7TAhFbx4jVWa4z"/>
                    <div style="display: flex; flex-direction: column; margin-top: 20px">
                        <p style="margin-left: 40px">${commendation.message}</p>
                        <div style="margin-left: 20px">
                            <h3>- ${fromUser.email}</h3>
                        </div>
                        <a style="margin-left: auto; margin-right: auto"href="https://bz-cedarville.com/commendations">View your Commendations</a>
                    </div>
                </div>`,
  } as MailOptions;
  let mailRes = await mail.sendMail(msg);

  return mailRes;
}

export const emailOthers = async (commendation: Commendation) => {
  let fromUser = await getUser(commendation.fromUser);
  let toUser = await getUser(commendation.toUser);
  const msg = {
    to: fromUser.email,
    from: process.env.EMAIL,
    subject: `[bz_commendations] ${toUser.name} has received a BZ Commendation`,
    text: `${commendation.message}\n\n-${fromUser.name}`,
    html: `<div>
                    <img width="500" height="100" src="http://drive.google.com/uc?export=view&id=1hReQjYUGqZXHK_WT1Q7TAhFbx4jVWa4z"/>
                    <div style="margin-top: 20px">
                        <div style="margin-left: 20px">
                            <h2>${toUser.name} received a new Commendation</h2>
                        </div>
                        <p style="margin-left: 40px; white-space: pre-line">${commendation.message}</p>
                        <div style="margin-left: 20px">
                            <h3>- ${fromUser.name}</h3>
                        </div>
                    </div>
                    <div style="margin-left: auto; margin-right: auto">
                        <div style="display: flex">
                            <a style="margin-right: 10px" href="mailto:${fromUser.email}">Email Sender</a>
                            ${" "}
                            <a href="mailto:${toUser.email}">Email Recipient</a>
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

export const emailSuggestionTeam = async (suggestion: Suggestion) => {
  let suggestionTeam: Team = await getTeam(suggestion.toTeam);
  let senderUser: User = await getUser(suggestion.fromUser);
  let emails = suggestionTeam.emailList.map(e => e.email);
  const msg = {
    to: emails,
    from: process.env.EMAIL,
    subject: `[bz_commendations] ${senderUser.email} has written a suggestion for ${suggestionTeam.name}`,
    text: `${suggestion.message}\n\n-${senderUser.email}`,
    html: `
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">
                            <img width="500" height="100" src="http://drive.google.com/uc?export=view&id=1hReQjYUGqZXHK_WT1Q7TAhFbx4jVWa4z"/ style="margin-left: auto; margin-right: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div style="display: flex; width: 200; height: 200; margin-top: 20px; margin-bottom: 20px;">
                                <img width="200" height="200" resize-mode='center' style="object-fit: scale-down; margin-left: auto; margin-right: auto;" src='${suggestionTeam.logo}'/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div>
                                <div>
                                    <h2>${senderUser.email} has written a suggestion for ${suggestionTeam.name}</h2>
                                </div>
                                <p style="white-space: pre-line;">${suggestion.message}</p>
                                <div>
                                    <h3>- ${senderUser.email}</h3>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <a href="mailto:${senderUser.email}">Email Sender</a>
                        </td>
                    </tr>
                </table>
                `,
  } as MailOptions;
  let mailRes = await mail.sendMail(msg)
    .catch((error) => {
      console.error(error)
    });

  return mailRes;
}