import twilio from "twilio";
import Commendation from "../models/commendation";

/**
 * Sends a text via the twilio NodeJS library.
 */
export const sendText = async (commendation: Commendation) => {
    let client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

    let message = await client.messages.create({
        body: `You received a commendation! ${commendation.message}`,
        to: commendation.phone,
        from: process.env.TWILIO_NUMBER
    });
}