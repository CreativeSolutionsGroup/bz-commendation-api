import { Request, Response } from "express";
import AWS from "aws-sdk";
import { email, emailOthers, emailSuggestionTeam } from "../utils/email";
import Suggestion from "../models/suggestion";

AWS.config.update({ region: "us-east-2" });

const documentClient = new AWS.DynamoDB.DocumentClient()

const create = async (req: Request, res: Response) => {
    let muteEmail = req.body.muteEmail;
    if(muteEmail === undefined){
        muteEmail = false;
    }
    const newSuggestion = req.body as Suggestion;

    newSuggestion.date = new Date().toISOString();

    try {
        if(!muteEmail){
            await emailSuggestionTeam(newSuggestion);
        }      
        return res.json(newSuggestion);
    } catch (e) {
        return res.json({ response: "Failed", reason: e });
    }
}

export { create };