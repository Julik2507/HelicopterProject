import { Input, number, object, partial, string } from "valibot";
import { getGoods } from "../goods.service.js";

export const getGoodsSchema = partial(
  object({
    page: string(),
    type_id: number(),
    brand_id: number(),
  })
);

export type GetAnyGoods = Input<typeof getGoodsSchema>;
