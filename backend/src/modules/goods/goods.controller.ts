import express from "express";
import { createGoods, getGoods, getOneGoods, uploadImg } from "./goods.service.js";

const router = express.Router();

router.post("/create-goods", async (req, res) => {
  const img_id = await uploadImg(req.files);
  const result = await createGoods(req.body, img_id);
  res.send(result);
});

router.get("/get-goods", async (req, res) => {
  const result = await getGoods(req.query);
  console.log(req.query);

  res.send(result);
});

router.get("/get-one-goods/:id", async (req, res) => {
  const result = await getOneGoods(req.params.id);
  res.send(result);
});

export default router;
