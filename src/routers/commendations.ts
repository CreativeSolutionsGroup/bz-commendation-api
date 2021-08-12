import { Express } from "express";
import { get, update, create, del } from "../controllers/commendations";

const commendationRoutes = (app: Express): void => {
    console.log(`Registering commendation routes.`)

    app.route(`/commendation`)
        .get(get)
        .put(update)
        .post(create)
        .delete(del)
}

export default commendationRoutes;