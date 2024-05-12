import { object, number, string, Output, nullable } from "valibot";

const ResGetBasketSchema = object({
  goods_id: number(),
  goodsName: string(),
  goodsPrice: string(),
  brand: string(),
  subtype: string(),
  img: string(),
});

export type GetBasketDTO = Output<typeof ResGetBasketSchema>;
