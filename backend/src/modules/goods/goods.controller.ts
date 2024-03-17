import express from "express";
import { createGoods, getGoods, getOneGoods, uploadImg } from "./goods.service.js";

const router = express.Router();

router.post("/goods", async (req, res) => {
  const img_id = await uploadImg(req.files);
  const result = await createGoods(req.body, img_id);
  res.send(result);
});

router.get("/goods", async (req, res) => {
  const result = await getGoods(req.query);
  res.send(result);
});

router.get("/one-goods", async (req, res) => {
  const result = await getOneGoods(req.query);
  res.send(result);
});

export default router;
