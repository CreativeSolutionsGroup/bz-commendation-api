import { Request, Response } from "express";
import jwt_decode from "jwt-decode";
import Commendation from "../models/commendation";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { emailOthers } from "../utils/email";
import { sendText } from "../utils/phone";
AWS.config.update({ region: "us-east-2" });
const documentClient = new AWS.DynamoDB.DocumentClient()

const all = async (req: Request, res: Response) => {
    try {
        let commendation = await documentClient.scan({
            TableName: "bz_commendation"
        }).promise()
        return res.status(200).json(commendation.Items);
    } catch (e) {
        return res.status(500).json({ response: "Failed", reason: e });
    }
}

const get = async (req: Request, res: Response) => {
    let auth = req.headers.authorization;

    let decodedToken = jwt_decode(auth.split(" ")[1]) as any;

    if (!decodedToken) {
        res.status(403).json({ response: "Failed to get the username from token.", error: 403 })
        return;
    }

    try {
        let commendation = await documentClient.scan({
            TableName: "bz_commendation",
            FilterExpression: "toEmail = :email",
            ExpressionAttributeValues: {
                ":email": decodedToken.email
            }
        }).promise()
        return res.status(200).json(commendation.Items);
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
    const newCommendation = req.body as Commendation;

    newCommendation._id = uuidv4();
    newCommendation.date = new Date().toISOString();

    let isTeamCommendation = () => {
        return (req.query.isTeamCommendation === "true")
    }

    try {
        await documentClient.put({
            TableName: "bz_commendation",
            Item: newCommendation
        }).promise();

        if (!muteEmail) {
            await emailOthers(newCommendation, isTeamCommendation());
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
        const dcRes = await documentClient.delete({
            TableName: "bz_commendation",
            Key: {
                "toEmail": id
            }
        }).promise();

        return res.status(200).json(dcRes.ItemCollectionMetrics);
    } catch (e) {
        return res.status(500).json({ response: "Failed", reason: e });
    }
}

export { all, get, update, create, del };