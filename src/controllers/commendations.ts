import { Request, Response } from "express";
import Commendation from "../models/commendation";
import { BatchGetItemCommandInput, DynamoDB } from "@aws-sdk/client-dynamodb";

const client = new DynamoDB({ region: "us-east-2" });

const all = async (req: Request, res: Response) => {
    
}

const get = async (req: Request, res: Response) => {
    const clientId = req.params.id;

    try {
        let commendation = await client.batchGetItem({
            RequestItems: {
                "bz_commendation": {
                    Keys: [
                        {
                            "email": {
                                S: clientId
                            }
                        }
                    ]
                }
            }
        } as BatchGetItemCommandInput)

        return res.json(commendation.Responses);
    } catch (e) {
        console.log(e);
    }
}

const update = async (req: Request, res: Response) => {

}

const create = async (req: Request, res: Response) => {
    console.log(req.body);
    const newCommendation = req.body as Commendation;
    await client.putItem({
        Item: {
            "email": {
                S: newCommendation.email
            },
            "fromEmail": {
                S: newCommendation.fromEmail
            },
            "message": {
                S: newCommendation.message
            },
            "date": {
                S: Date.now().toString() // Date.now() returns a string | unknown, so we have to cast to string.
            }
        },
        TableName: "bz_commendation"
    })
}

const del = async (req: Request, res: Response) => {

}

export { all, get, update, create, del };