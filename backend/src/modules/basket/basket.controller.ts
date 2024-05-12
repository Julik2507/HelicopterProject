import express from "express";
import { putGoodsInBasket } from "./basket.service.js";
import { authMiddlewareUser } from "../auth/middleware/user.js";
import { getMyGoods } from "./basket.service.js";

const router = express.Router();

router.post("/catalogue/add-goods/:id", authMiddlewareUser, async (req: any, res) => {
  try {
    const result = await putGoodsInBasket(req.params.id, req.user.user_id);
    res.status(200).send("Здарова");
  } catch (error: any) {
    console.log(error);
  }
});

router.get("/catalogue/get-goods", authMiddlewareUser, async (req: any, res) => {
  const result = await getMyGoods(req.user.user_id);
  res.status(200).send(result);
});

export default router;
