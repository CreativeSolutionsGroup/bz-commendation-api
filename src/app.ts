import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import commendationsRouter from "./routers/commendations";
import userRouter from "./routers/users";
import employeeRouter from "./routers/employees";
import suggestionsRouter from "./routers/suggestions";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import AWS, { ConfigurationOptions } from "aws-sdk";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
dotenv.config();

AWS.config.update({
  region: "us-east-2",
} as ConfigurationOptions);

const port = process.env.PORT;
const app = express();
const swaggerDocument = YAML.load("./docs/openapi.yaml");
// All routes must be registered after this cors call.
app.use(cors());
app.use(bodyParser.json());

commendationsRouter(app);
employeeRouter(app);
userRouter(app);
suggestionsRouter(app);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
  console.log(`Server started on port ${port} 🚀🚀🚀`);
});

module.exports.handler = serverless(app);
