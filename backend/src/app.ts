import authController from "./modules/auth/auth.controller.js";
import usersController from "./modules/users/users.controller.js";
import typesController from "./modules/types/types.controller.js";
import brandsController from "./modules/brands/brands.controller.js";
import goodsController from "./modules/goods/goods.controller.js";
import basketController from "./modules/basket/basket.controller.js";
import searchController from "./modules/search/search.controller.js";
import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yaml";
import fs from "fs";
import { config } from "./configuration/index.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();
const port = config.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4173", "http://localhost:5173", "http://176.109.107.106:80"],
  })
);
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", express.static(path.resolve(__dirname, "static"))); //rebuild

app.use("/api", authController);
app.use("/api", usersController);
app.use("/api", typesController);
app.use("/api", brandsController);
app.use("/api", goodsController);
app.use("/api", basketController);
app.use("/api", searchController);
// app.use("/api");

const file = fs.readFileSync("./src/swagger/swaggerDocument.yml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
