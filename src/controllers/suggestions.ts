import { Request, Response } from "express";
import AWS from "aws-sdk";
import { emailSuggestionTeam } from "../utils/email";
import jwt_decode from "jwt-decode";
import Suggestion from "../models/suggestion";

AWS.config.update({ region: "us-east-2" });

const create = async (req: Request, res: Response) => {
    let auth = req.headers.authorization;
    let muteEmail = req.body.muteEmail;
    if(muteEmail === undefined){
        muteEmail = false;
    }
    const newSuggestion = req.body as Suggestion;
    let decodedToken = jwt_decode(auth.split(" ")[1]) as any;

    newSuggestion.date = new Date().toISOString();
    newSuggestion.fromEmail = decodedToken.email;

    try {
        if(!muteEmail){
            await emailSuggestionTeam(newSuggestion);
        }      
        return res.status(200).json(newSuggestion);
    } catch (e) {
        return res.status(500).json({ response: "Failed", reason: e });
    }
}

export { create };