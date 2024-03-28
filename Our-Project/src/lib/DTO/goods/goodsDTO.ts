import { number, object, partial, string, type Input, any } from "valibot";

const getGoodsSchema = partial(
  object({
    type_id: number("Неправильный тип товара"),
    brand_id: number("Неправильный тип бренда"),
    page: number("Неправильный тип страницы"),
  })
);

export type GetGoodsDTO = Input<typeof getGoodsSchema>;

const createGoodsSchema = object({
  name: string(),
  price: number(),
  type_id: number(),
  brand_id: number(),
  img: any(),
  info: any(),
});

export type CreateGoodsDTO = Input<typeof createGoodsSchema>;
