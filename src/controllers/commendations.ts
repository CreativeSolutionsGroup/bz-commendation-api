import { Request, Response } from "express";
import jwt_decode from "jwt-decode";
import Commendation from "../models/commendation";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { emailEmployee } from "../utils/email";
AWS.config.update({ region: "us-east-2" });
const documentClient = new AWS.DynamoDB.DocumentClient()

const all = async (req: Request, res: Response) => {

}

const get = async (req: Request, res: Response) => {
    let auth = req.headers.authorization;

    let decodedToken = jwt_decode(auth.split(" ")[1]) as any;

    try {
        let commendation = await documentClient.scan({
            TableName: "bz_commendation",
            FilterExpression: "toEmail = :email",
            ExpressionAttributeValues: {
                ":email": decodedToken.email
            }
        }).promise()
        return res.json(commendation.Items);
    } catch (e) {
        return res.json({ response: "Failed", reason: e });
    }
}

const update = async (req: Request, res: Response) => {

}

const create = async (req: Request, res: Response) => {
    const newCommendation = req.body as Commendation;

    newCommendation._id = uuidv4();
    newCommendation.date = new Date().toISOString();

    try {
        await documentClient.put({
            TableName: "bz_commendation",
            Item: newCommendation
        }).promise();

        emailEmployee(newCommendation);
        //emailDirector();

        return res.json("Finished.");
    } catch (e) {
        return res.json({ response: "Failed", reason: e });
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

        return res.json(dcRes.ItemCollectionMetrics);
    } catch (e) {
        return res.json({ response: "Failed", reason: e });
    }
}

export { all, get, update, create, del };