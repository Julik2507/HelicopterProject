import { number, object, partial, string, type Input, any } from "valibot";

const getGoodsSchema = partial(
  object({
    subtype_id: number("Неправильный тип товара"),
    page: number("Неправильный тип страницы"),
  })
);

export type GetGoodsDTO = Input<typeof getGoodsSchema>;

const createGoodsSchema = object({
  name: string(),
  price: number(),
  type_id: number(),
  brand_id: number(),
  image: any(),
  value_1: string(),
  value_2: string(),
  value_3: string(),
  value_4: string(),
  value_6: string(),
  value_7: string(),
  value_8: string(),
  value_9: string(),
});

export type CreateGoodsDTO = Input<typeof createGoodsSchema>;
