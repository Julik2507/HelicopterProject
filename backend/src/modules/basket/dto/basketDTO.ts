import { object, number, string, Output, nullable, optional, Input, array } from "valibot";

const ResGetBasketSchema = object({
  goods_id: number(),
  goodsName: string(),
  goodsPrice: string(),
  brand: string(),
  subtype: string(),
  img: string(),
});

export type GetBasketDTO = Output<typeof ResGetBasketSchema>;

export const ResSendDataToDeliverySchema = object({
  name: string("Не указано имя"),
  surname: string("Не указана фамилия"),
  numberPhone: number("Не указан номер телефона"),
  city: string("Не указан город проживания"),
  street: string("Некорректно указан адрес доставки"),
  house: number("Некорректно указан адрес доставки"),
  Kvartira: optional(number()),
  Korporativ: optional(number()),
  podiezd: optional(number()),
  etaz: optional(number()),
  kodOtDomofona: optional(number()),
});

export type ResSendDataToDeliveryDTO = Input<typeof ResSendDataToDeliverySchema>;

const ReqPutGoodsSchema = object({
  result: array(
    object({
      quantity: nullable(number()),
      singlePrice: number(),
    })
  ),
  totalPriceCounter: number(),
});

export type ReqPutGoodsDTO = Output<typeof ReqPutGoodsSchema>;

const ReqGetMyGoodsSchema = object({
  result: array(
    object({
      goods_id: number(),
      goodsName: nullable(string()),
      goodsPrice: nullable(number()),
      brand: nullable(string()),
      subtype: nullable(string()),
      img: nullable(string()),
    })
  ),
  info: object({
    result: array(
      object({
        price: nullable(number()),
        quantity: nullable(number()),
        singlePrice: number(),
      })
    ),
    totalPriceCounter: number(),
  }),
});

export type ReqGetMyGoodsDTO = Output<typeof ReqGetMyGoodsSchema>;
