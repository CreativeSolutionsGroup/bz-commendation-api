import { getUserProfileImage } from './../controllers/users';
import { Express } from "express";
import { getEmployeePhotos } from "../controllers/employees";
import { getEmployeesRet } from "../controllers/users";
import { checkLoggedIn, checkAdmin } from "../utils/auth";
import { getTeams } from '../services/team';

const employeeRouter = (app: Express): void => {
  app.route("/employees")
    .get(checkLoggedIn, getEmployeesRet);

  app.route("/employees/teams")
    .get(checkLoggedIn, getTeams);

  app.route("/employees/profiles")
    .get(checkLoggedIn, getEmployeePhotos);

  app.route("/employees/profiles/me")
    .get(checkLoggedIn, getUserProfileImage);
}

export default employeeRouter;