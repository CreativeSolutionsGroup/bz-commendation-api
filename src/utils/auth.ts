import { Request, Response, RequestHandler } from "express";
import Axios from "axios";

const checkLoggedIn: RequestHandler = async (req: Request, res: Response, next) => {
    let bearer = req.headers.authorization;
    
    try {
        let splitBearer = bearer.split(" ")[1];
        let tokenRes = await Axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${splitBearer}`);

        if (tokenRes.status !== 200) {
            throw "bad auth";
        }
    } catch (e) {
        res.json({
            type: "failed",
            message: "Authentication failed."
        });

        return;
    }

    next();
}

export { checkLoggedIn };