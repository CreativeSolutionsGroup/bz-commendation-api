import express from "express";
import dotenv from "dotenv";

import commendationsRouter from "./routers/commendations";
import serverless from "serverless-http"
import bodyParser from "body-parser";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
commendationsRouter(app);

app.listen(port, () => {
    console.log(`Server started on port ${port} 🚀🚀🚀`);
})

module.exports.handler = serverless(app)