import { Request, Response, RequestHandler } from "express";
import Axios from "axios";
import { existsInSheet, isAdmin } from "../controllers/users";
import Commendation from "../models/commendation";

export const checkLoggedIn: RequestHandler = async (req: Request, res: Response, next) => {
    let bearer = req.headers.authorization;

    try {
        let splitBearer = bearer.split(" ")[1];
        let tokenRes = await Axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${splitBearer}`);

        const email = tokenRes["email"];
        
        const allowedToAccess = await existsInSheet(email);

        if (!allowedToAccess) {
            throw "does not exist in sheet";
        }

        if (tokenRes.status !== 200) {
            throw "bad auth";
        }
    } catch (e) {
        res.status(403).json({
            type: "failed",
            message: "Authentication failed."
        });

        return;
    }

    next();
}

export const checkAdmin: RequestHandler = async (req: Request, res: Response, next) => {
    let bearer = req.headers.authorization;

    try {
        let splitBearer = bearer.split(" ")[1];
        let tokenRes = await Axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${splitBearer}`);

        const email = tokenRes.data["email"];

        if(email === undefined){
            throw "Invalid User";
        }
        
        const allowedToAccess = await isAdmin(email);

        if (!allowedToAccess) {
            throw "user is not admin";
        }

        if (tokenRes.status !== 200) {
            throw "bad auth";
        }
    } catch (e) {
        res.status(403).json({
            type: "failed",
            message: "Authentication failed."
        });

        return;
    }

    next();
}