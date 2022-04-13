import { userExistsByEmail } from './../services/users';
import { Request, Response, RequestHandler } from "express";
import Axios from "axios";
import { isAdmin } from "../controllers/users";

export const checkLoggedIn: RequestHandler = async (req: Request, res: Response, next) => {
    let bearer = req.headers.authorization;

    try {
        let splitBearer = bearer.split(" ")[1];
        let tokenRes = await Axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${splitBearer}`);

        const email = tokenRes.data["email"];
        
        const allowedToAccess = await userExistsByEmail(email);

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
        if(e.response && e.response.status === 400){
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
            message: `Auth failed ${e}`,
            raw: e
        });

        return;
    }

    next();
}