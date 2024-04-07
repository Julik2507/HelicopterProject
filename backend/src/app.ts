import authController from "./modules/auth/auth.controller.js";
import usersController from "./modules/users/users.controller.js";
import typesController from "./modules/types/types.controller.js";
import brandsController from "./modules/brands/brands.controller.js";
import goodsController from "./modules/goods/goods.controller.js";
import basketController from "./modules/basket/basket.controller.js";
import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yaml";
import fs from "fs";
import { config } from "./configuration/index.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import cookieparser from "cookie-parser";

const app = express();
const port = config.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));

app.use("/auth", authController);
app.use("/user", usersController);
app.use("/api", typesController);
app.use("/api", brandsController);
app.use("/api", goodsController);
app.use("/api", basketController);

const file = fs.readFileSync("./src/swagger/swaggerDocument.yml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
