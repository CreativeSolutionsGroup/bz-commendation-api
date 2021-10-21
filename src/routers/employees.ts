import { Express } from "express";
import { getEmployeePhotos, getProfileImage, getTeams } from "../controllers/employees";

import { checkLoggedIn, checkAdmin } from "../utils/auth";
const employeeRouter = (app: Express): void => {
    app.route("/employees/teams")
        .get(checkLoggedIn, getTeams);

    app.route("/employees/profiles")
        .get(checkLoggedIn, getEmployeePhotos);

    app.route("/employees/profiles/me")
        .get(checkLoggedIn, getProfileImage);
}

export default employeeRouter;