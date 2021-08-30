import { Express } from "express";

import { login } from "../controllers/users";

const userRoutes = (app: Express): void => {
    console.log(`Registering user routes.`)

    app.route(`/user`)
        .post(login)
}

export default userRoutes;