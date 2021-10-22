import { Express } from "express";
import { create } from "../controllers/suggestions";

import { checkLoggedIn, checkAdmin } from "../utils/auth";

const suggestionRoutes = (app: Express): void => {
    console.log(`Registering commendation routes.`)

    app.route(`/suggestion`)
        .post(checkLoggedIn, create);
}

export default suggestionRoutes;