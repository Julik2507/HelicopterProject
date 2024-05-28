import { object, number, string, Output, nullable, optional, Input, array, minLength, minSize, minValue } from "valibot";

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
  name: string([minLength(3, "Пожалуйста, укажите ваше имя!")]),
  surname: string([minLength(3, "Пожалуйста, укажите вашу фамилию!")]),
  numberPhone: number([minValue(3, "Пожалуйста, укажите ваш номер телефона!")]),
  city: string([minLength(3, "Пожалуйста, укажите город проживания")]),
  street: string([minLength(3, "Пожалуйста, укажите ваш адрес доставки")]),
  house: number([minValue(3, "Пожалуйста, укажите адрес доставки")]),
  Kvartira: optional(number()),
  Korporativ: optional(number()),
  podiezd: optional(number()),
  etaz: optional(number()),
  kodOtDomofona: optional(number()),
  comment: optional(string()),
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
