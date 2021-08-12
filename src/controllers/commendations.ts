import { Request, Response } from "express";
import Commendation from "../models/commendation";
import { BatchGetItemCommandInput, DynamoDB } from "@aws-sdk/client-dynamodb";

const get = async (req: Request, res: Response) => {
    const client = new DynamoDB({ region: "us-east-2" });

    try {
        let something = await client.batchGetItem({
            RequestItems: {
                "bz_commendation": {
                    Keys: [
                        {
                            "email": {
                                S: "alecmathisen@cedarville.edu"
                            }
                        }
                    ]
                }
            }
        } as BatchGetItemCommandInput)

        console.log(something);
        return res.json(something);
    } catch (e) {
        console.log(e);
    }
}

const update = async (req: Request, res: Response) => {

}

const create = async (req: Request, res: Response) => {

}

const del = async (req: Request, res: Response) => {

}

export { get, update, create, del };