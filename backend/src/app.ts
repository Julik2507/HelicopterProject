import authController from "./modules/auth/auth.controller.js";
import usersController from "./modules/users/users.controller.js";
import typesController from "./modules/types/types.controller.js";
import brandsController from "./modules/brands/brands.controller.js";
import goodsController from "./modules/goods/goods.controller.js";
import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yaml";
import fs from "fs";
import { config } from "./configuration/index.js";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();
const port = config.port;

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(fileUpload({}));

app.use("/auth", authController);
app.use("/user", usersController);
app.use("/api", typesController);
app.use("/api", brandsController);
app.use("/api", goodsController);

const file = fs.readFileSync("./src/swagger/swaggerDocument.yml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
