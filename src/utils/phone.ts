import Commendation from "../models/commendation";
import { getEmployeeName } from "../controllers/users";
import dotenv from "dotenv";

dotenv.config();

const client = require('twilio')(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
);
const twilioNumber = process.env.TWILIO_NUMBER;

/**
 * Sends a text via the twilio NodeJS library.
 */
export const sendText = async (commendation: Commendation) => {

    let senderName = await getEmployeeName(commendation.fromEmail)
    
    let message = commendation.message;
    if (message.length > 90) {
        message = message.substr(0, 90) + "..."
    }

    let textMessage = `You received a commendation! \n\n${message}\n--${senderName}\n(bz-cedarville.com)`
    console.log(textMessage)
    let phoneResponse = await client.messages
    .create({
        from: twilioNumber,
        to: commendation.phone,
        body: textMessage
    })
    .catch((error) => {
        console.log(error);
    });
    return phoneResponse;
}