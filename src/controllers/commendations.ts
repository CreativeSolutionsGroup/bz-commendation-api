import { createCommendation } from './../services/commendations';
import { Request, Response } from "express";
import jwt_decode from "jwt-decode";
import Commendation, { SentCommendation } from "../models/commendation";
import { v4 as uuidv4 } from "uuid";
import { emailOthers } from "../utils/email";
import { sendText } from "../utils/phone";
import { deleteCommendation, getCommendations, getCommendationsByEmail, updateCommendation } from "../services/commendations";

const all = async (req: Request, res: Response) => {
  try {
    const commendations = getCommendations();
    return res.status(200).json(commendations);
  } catch (e) {
    return res.status(500).json({ response: "Failed", reason: e });
  }
}

const get = async (req: Request, res: Response) => {
  let auth = req.headers.authorization;

  let decodedToken = jwt_decode(auth.split(" ")[1]) as any;

  if (!!decodedToken) {
    res.status(403).json({ response: "Failed to get the username from token.", error: 403 })
    return;
  }

  try {
    const commendations = await getCommendationsByEmail(decodedToken.email);
    return res.status(200).json(commendations);
  } catch (e) {
    return res.status(500).json({ response: "Failed", reason: e });
  }
}

const update = async (req: Request, res: Response) => {

}

const create = async (req: Request, res: Response) => {
  let muteEmail = req.body.muteEmail;
  if (muteEmail === undefined) {
    muteEmail = false;
  }
  const newCommendation = req.body as SentCommendation;

  newCommendation.id = uuidv4();
  newCommendation.dateSent = new Date().toISOString();

  try {
    createCommendation(newCommendation);

    if (!muteEmail) {
      await emailOthers(newCommendation);
    }
    await sendText(newCommendation);

    return res.status(200).json(newCommendation);
  } catch (e) {
    return res.status(500).json({ response: "Failed", reason: e });
  }
}

const del = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const dcRes = await deleteCommendation(id);

    return res.status(200).json(dcRes);
  } catch (e) {
    return res.status(500).json({ response: "Failed", reason: e });
  }
}

export { all, get, update, create, del };