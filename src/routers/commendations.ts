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
    .get(checkLoggedIn, get)
    .delete(checkLoggedIn, del);

  app.route(`/commendation/admin`).get(checkAdmin, all);

  // Note: This is for a "kiosk" that we set up very rarely.
  // Everyone should be able to hit this.
  app.route(`/commendation/kiosk`).post(create);
};

export default commendationRoutes;
