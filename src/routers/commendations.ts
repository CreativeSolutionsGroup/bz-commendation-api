import { Express } from "express";
import { all, get, update, create, del } from "../controllers/commendations";

const commendationRoutes = (app: Express): void => {
    console.log(`Registering commendation routes.`)

    app.route(`/commendation`)
        .get(all)
        .put(update)
        .post(create)
        .delete(del)

    app.route(`/commendation/:id`)
        .get(get)
}

export default commendationRoutes;