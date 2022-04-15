import { getUser } from './../services/users';
import Commendation from "../models/commendation";
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

  let senderUser = await getUser(commendation.fromUser);
  let toUser = await getUser(commendation.toUser);

  let message = commendation.message;
  if (message.length > 90) {
    message = message.substring(0, 90) + "..."
  }

  let textMessage = `You received a BZ Commendation! \n\n${message}\n--${senderUser}\n(bz-cedarville.com)`
  console.log("Text to: " + toUser.phone);
  console.log(textMessage);
  let phoneResponse = await client.messages
    .create({
      from: twilioNumber,
      to: toUser.phone,
      body: textMessage
    })
    .catch((error: string) => {
      console.log(error);
    });
  return phoneResponse;
}