import express from "express";
import { createGoods, getGoods, getOneGoods } from "./goods.service.js";
import { uploadImg } from "../images/images.service.js";
import { parse } from "valibot";
import { getGoodsSchema } from "./dto/index.js";
import { authMiddlewareUser } from "../auth/middleware/user.js";

const router = express.Router();

router.post("/create-goods", async (req, res) => {
  try {
    //мб запихнуть все в createGoods и валидировать там
    const imgID = await uploadImg(req.files);
    const result = await createGoods(req.body, imgID);
    res.send(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/get-goods", authMiddlewareUser, async (req, res) => {
  try {
    const validate = parse(getGoodsSchema, req.query);
    const result = await getGoods(req.query);
    res.send(result);
  } catch (error: any) {
    console.log("test2");

    res.status(400).json({ message: error.message });
  }
});

router.get("/get-one-goods/:id", async (req, res) => {
  // по валидации req.params(Приходит строка)
  try {
    const result = await getOneGoods(req.params.id);
    res.send(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
