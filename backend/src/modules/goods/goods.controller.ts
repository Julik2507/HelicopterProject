import express from "express";
import { createGoods } from "./goods.service.js";
import * as uuid from "uuid";
import path from "path";

import { fileURLToPath } from "url";

const router = express.Router();

router.post("/goods", async (req, res) => {
  try {
    const { img }: any = req.files;
    let fileName = uuid.v4() + ".jpg";

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    console.log(__dirname);
    console.log(img);

    console.log("file is moving...");
    img.mv(path.resolve(__dirname, "../..", "static", fileName));
    console.log("file moved!");

    const result = await createGoods(req.body, fileName);
    res.send(result);
  } catch (error: any) {
    console.log(error);
    res.json({ message: error.message });
  }
});

export default router;
