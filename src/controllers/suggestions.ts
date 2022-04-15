import { Request, Response } from "express";
import { emailSuggestionTeam } from "../utils/email";
import jwt_decode from "jwt-decode";
import Suggestion from "../models/suggestion";

/**
 * Note: there is no internal storage for the email.
 * 
 * @author Alec
 */
const create = async (req: Request, res: Response) => {
  let muteEmail = req.body.muteEmail;
  if (muteEmail === undefined) {
    muteEmail = false;
  }
  const newSuggestion = req.body as Suggestion;

  newSuggestion.date = new Date().toISOString();

  try {
    if (!muteEmail) {
      await emailSuggestionTeam(newSuggestion);
    }
    return res.status(200).json(newSuggestion);
  } catch (e) {
    return res.status(500).json({ response: "Failed", reason: e });
  }
}

export { create };