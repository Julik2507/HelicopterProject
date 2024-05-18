import express from "express";
import { minusQuantityGoodsInBasket, putGoodsInBasket, sendInfoToDelivery } from "./basket.service.js";
import { authMiddlewareUser } from "../auth/middleware/user.js";
import { getMyGoods } from "./basket.service.js";
import { deleteGoods } from "./basket.service.js";
import { parse } from "valibot";
import { ResSendDataToDeliverySchema } from "./dto/basketDTO.js";

const router = express.Router();

router.post("/catalogue/add-goods/:id", authMiddlewareUser, async (req: any, res) => {
  try {
    const result = await putGoodsInBasket(req.params.id, req.user.id);
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
  }
});

router.get("/catalogue/get-goods", authMiddlewareUser, async (req: any, res) => {
  const result = await getMyGoods(req.user.id);
  res.status(200).send(result);
});

router.get("/basket/minus-quantity/:id", authMiddlewareUser, async (req: any, res) => {
  const result = await minusQuantityGoodsInBasket(req.params.id, req.user.id);
  res.status(200).send(result);
});

router.get("/catalogue/delete-goods/:id", authMiddlewareUser, async (req: any, res) => {
  const result = await deleteGoods(req.params.id, req.user.id);
  res.send(result);
});

router.post("/basket/send-data-to-delivery", authMiddlewareUser, async (req: any, res) => {
  const validate = parse(ResSendDataToDeliverySchema, req.body);
  const result = await sendInfoToDelivery(req.body, req.user.id);
  res.status(200).send(result);
});
export default router;
