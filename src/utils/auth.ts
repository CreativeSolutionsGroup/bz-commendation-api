import { Request, Response, RequestHandler } from "express";
import Axios from "axios";
import { existsInSheet, isAdmin, isExec } from "../controllers/users";
import Commendation from "../models/commendation";

export const checkLoggedIn: RequestHandler = async (req: Request, res: Response, next) => {
    let bearer = req.headers.authorization;

    try {
        let splitBearer = bearer.split(" ")[1];
        let tokenRes = await Axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${splitBearer}`);

        const email = tokenRes.data["email"];
        
        const allowedToAccess = await existsInSheet(email);

        if (!allowedToAccess) {
            res.status(403).json({
                type: "failed",
                message: 'Invalid User'
            });
            return;
        }

        if (tokenRes.status !== 200) {
            res.status(401).json({
                type: "failed",
                message: 'Invalid Auth'
            });
            return;
        }
    } catch (e) {
        console.log(e)
        if(e.response.status === 400){
            //Session Expired
            res.status(401).json({
                type: "failed",
                message: "Session Expired"
            });
            return;
        }
        res.status(403).json({
            type: "failed",
            message: e
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

// used to verify if user is an exec by their email from their token
export const checkExec: RequestHandler = async (req: Request, res: Response, next) => {
    let bearer = req.headers.authorization;

    try {

        // get token
        let splitBearer = bearer.split(" ")[1];
        let tokenRes = await Axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${splitBearer}`);

        // pull email out of token
        const email = tokenRes.data["email"];
        if(email === undefined){
            throw "Invalid User";
        }
        
        // check if email belongs to an exec
        const allowedToAccess = await isExec(email);

        if (!allowedToAccess) {
            throw "user is not exec";
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