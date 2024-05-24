import express from "express";
import { minusQuantityGoodsInBasket, putGoodsInBasket, sendInfoToDelivery } from "./basket.service.js";
import { authMiddlewareUser } from "../auth/middleware/user.js";
import { getMyGoods, getTotalPrice } from "./basket.service.js";
import { deleteGoods } from "./basket.service.js";
import { parse } from "valibot";
import { ResSendDataToDeliverySchema } from "./dto/basketDTO.js";
import { get } from "http";

const router = express.Router();

router.post("/catalogue/add-goods/:id", authMiddlewareUser, async (req: any, res) => {
  try {
    const result = await putGoodsInBasket(req.params.id, req.user.id);
    res.status(200).send(result);
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

router.get("/catalogue/get-goods", authMiddlewareUser, async (req: any, res) => {
  try {
    const result = await getMyGoods(req.user.id);
    res.status(200).send(result);
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

router.get("/basket/minus-quantity/:id", authMiddlewareUser, async (req: any, res) => {
  try {
    const result = await minusQuantityGoodsInBasket(req.params.id, req.user.id);
    res.status(200).send(result);
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

router.get("/catalogue/delete-goods/:id", authMiddlewareUser, async (req: any, res) => {
  try {
    const result = await deleteGoods(req.params.id, req.user.id);
    res.send(result);
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

router.post("/basket/send-data-to-delivery", authMiddlewareUser, async (req: any, res) => {
  try {
    const validate = parse(ResSendDataToDeliverySchema, req.body);
    const result = await sendInfoToDelivery(req.body, req.user.id);

    // let msg = `Здравствуйте, уважаемый покупатель! Спасибо за покупку! В ближайшее время к вам приедет курьер по адресу ${result.dto.city}, улица ${result.dto.street}, дом ${result.dto.house}.
    // Ваш заказ: `;

    // router.post(
    //   `https://api.telegram.org/bot6100257122:AAE2pG2KUcYxq5ISYoBUCVEQ0LEXCpUVjc0/sendMessage?chat_id=-4115181766&parse_mode=html&text=ПРИВЕТ`
    // );
    res.send(result);
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

router.get("/catalogue/get-total-price", authMiddlewareUser, async (req: any, res) => {
  try {
    const result = await getTotalPrice(req.user.id);
    res.send(result);
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

export default router;
