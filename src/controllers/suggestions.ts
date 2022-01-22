import { Request, Response } from "express";
import AWS from "aws-sdk";
import jwt_decode from "jwt-decode";
import { email, emailOthers, emailSuggestionTeam } from "../utils/email";
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
        return res.json("Finished.");
    } catch (e) {
        return res.json({ response: "Failed", reason: e });
    }
}

export { create };