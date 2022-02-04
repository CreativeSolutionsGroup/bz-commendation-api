import { Express } from "express";
import { all, get, update, create, del } from "../controllers/commendations";

import { checkLoggedIn, checkAdmin } from "../utils/auth";

const commendationRoutes = (app: Express): void => {
  console.log(`Registering commendation routes.`);

  app.route(`/checkAuth`).get(checkLoggedIn, (_, res) => {
    res.json({ message: `You are logged in.` });
  });

  app.route(`/checkAdmin`).get(checkAdmin, (_, res) => {
    res.json({ message: `You are admin.` });
  });

  app
    .route(`/commendation`)
    .get(checkLoggedIn, all)
    .put(checkLoggedIn, update)
    .post(checkLoggedIn, create);

  app
    .route(`/commendation/user`)
    .get(get, checkLoggedIn)
    .delete(del, checkLoggedIn);

  app.route(`/commendation/admin`).get(all, checkAdmin);

  app.route(`/commendation/kiosk`).post(create);
};

export default commendationRoutes;
