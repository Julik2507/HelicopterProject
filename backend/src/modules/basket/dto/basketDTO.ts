import { object, number, string, Output, nullable, optional, Input } from "valibot";

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
