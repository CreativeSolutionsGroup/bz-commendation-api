import express from "express";
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

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
commendationsRouter(app);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.listen(port, () => {
    console.log(`Server started on port ${port} 🚀🚀🚀`);
})

module.exports.handler = serverless(app)