import Commendation from "../models/commendation";
import { getEmployeeName } from "../controllers/users";
require('dotenv').config();

const client = require('twilio')(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
);
const twilioNumber = process.env.TWILIO_NUMBER;

/**
 * Sends a text via the twilio NodeJS library.
 */
export const sendText = (commendation: Commendation) => {

    getEmployeeName(commendation.fromEmail)
    .then(senderName => {

        let message = commendation.message;
        if (message.length > 90) {
            message = message.substr(0, 90) + "..."
        }

        let textMessage = `You received a commendation! \n\n${message}\n--${senderName}\n(bz-cedarville.com)`
        console.log(textMessage)
        client.messages
        .create({
            from: twilioNumber,
            to: commendation.phone,
            body: textMessage
        })
        .then(() => {
            console.log("Message Sent to " + commendation.phone)
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}