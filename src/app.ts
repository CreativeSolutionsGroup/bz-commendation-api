import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import serverless from "serverless-http"
import bodyParser from "body-parser";
import AWS, { ConfigurationOptions } from "aws-sdk";

dotenv.config();

AWS.config.update(
    {
        region: "us-east-2"
    } as ConfigurationOptions
)

import commendationsRouter from "./routers/commendations";
import userRouter from "./routers/users";


const port = process.env.PORT;
const app = express();
// All routes must be registered after this cors call.
app.use(cors());
app.use(bodyParser.json());

commendationsRouter(app);
userRouter(app);

app.listen(port, () => {
    console.log(`Server started on port ${port} 🚀🚀🚀`);
})

module.exports.handler = serverless(app)