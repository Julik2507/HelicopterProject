import express from "express";
import { createGoods, getGoods, getOneGoods } from "./goods.service.js";
import { uploadImg } from "../images/images.service.js";

const router = express.Router();

router.post("/create-goods", async (req, res) => {
  const imgID = await uploadImg(req.files);
  const result = await createGoods(req.body, imgID);
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
