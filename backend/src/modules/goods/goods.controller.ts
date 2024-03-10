import express from "express";
import { createGoods } from "./goods.service.js";

const router = express.Router();

router.post("/goods", async (req, res) => {
  const result = await createGoods(req.body);
  res.send(result);
});

export default router;
