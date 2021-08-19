import { Request, Response } from "express";
import Commendation from "../models/commendation";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-2" });
const documentClient = new AWS.DynamoDB.DocumentClient()

const all = async (req: Request, res: Response) => {
    
}

const get = async (req: Request, res: Response) => {
    const clientId = req.params.id;

    try {
        let commendation = await documentClient.get({
            TableName: "bz_commendation",
            Key: {
                email: clientId
            }
        }).promise()
        return res.json(commendation.Item);
    } catch (e) {
        return res.json({response: "Failed", reason: e});
    }
}

const update = async (req: Request, res: Response) => {

}

const create = async (req: Request, res: Response) => {
    const newCommendation = req.body as Commendation;

    newCommendation.date = Date.now().toString();

    try {
        await documentClient.put({
            TableName: "bz_commendation",
            Item: newCommendation
        }).promise();

        return res.json("Finished.");
    } catch (e) {
        return res.json({response: "Failed", reason: e});
    }
}

const del = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const dcRes = await documentClient.delete({
            TableName: "bz_commendation",
            Key: {
                "email": id
            }
        }).promise();

        return res.json(dcRes.ItemCollectionMetrics);
    } catch (e) {
        return res.json({response: "Failed", reason: e});
    }
}

export { all, get, update, create, del };