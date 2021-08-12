import { Express } from "express";
import { all, get, update, create, del } from "../controllers/commendations";

const commendationRoutes = (app: Express): void => {
    console.log(`Registering commendation routes.`)

    app.route(`/commendation`)
        .get(all)
        .put(update)
        .post(create)

    app.route(`/commendation/:id`)
        .get(get)
        .delete(del)
}

export default commendationRoutes;