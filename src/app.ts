import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import commendationsRouter from "./routers/commendations";
import userRouter from "./routers/users";
import employeeRouter from "./routers/employees";
import suggestionsRouter from "./routers/suggestions";
import serverless from "serverless-http";
import AWS, { ConfigurationOptions } from "aws-sdk";
import { initDatabase } from "./utils/database";
dotenv.config();

AWS.config.update({
  region: "us-east-2",
} as ConfigurationOptions);

const port = process.env.PORT;
const app = express();
// All routes must be registered after this cors call.
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

commendationsRouter(app);
employeeRouter(app);
userRouter(app);
suggestionsRouter(app);

await initDatabase();

app.listen(port, () => {
  console.log(`Server started on port ${port} 🚀🚀🚀`);
});

module.exports.handler = serverless(app);
