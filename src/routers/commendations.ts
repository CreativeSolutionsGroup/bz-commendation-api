import { Express } from "express";
import { all, get, update, create, del } from "../controllers/commendations";

import { checkLoggedIn } from "../utils/auth";

const commendationRoutes = (app: Express): void => {
    console.log(`Registering commendation routes.`)

    app.route(`/commendation`)
        .get(checkLoggedIn, all)
        .put(checkLoggedIn, update)
        .post(checkLoggedIn, create);

    app.route(`/commendation/:id`)
        .get(get, checkLoggedIn)
        .delete(del, checkLoggedIn);
}

export default commendationRoutes;