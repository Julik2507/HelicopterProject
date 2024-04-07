import express from "express";
import { getBasketGoods, sendGoods } from "./basket.service.js";
const router = express.Router();

router.post("/chose-goods", async (req, res) => {
  const result = await sendGoods(req.body);
  res.send(result);
});

router.get("/my-basket/:id", async (req, res) => {
  const result = await getBasketGoods(req.params.id);
  res.send(result);
});

export default router;
