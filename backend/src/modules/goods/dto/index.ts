import { Input, any, number, object, partial, string } from "valibot";

export const getGoodsSchema = partial(
  object({
    page: number("Страница не найдена"),
    type_id: number("Тип не найден"),
    brand_id: number("Бренд не найден"),
  })
);
export type GetAnyGoods = Input<typeof getGoodsSchema>;

export const CreateGoodsSchema = object({
  name: string("Неправильный тип названия продукта"),
  price: number("Неверный тип стоимости"),
  brand_id: number("Неверный тип id"),
  type_id: number("Неверный тип id "),
  image: any(),
});
export type CreateGoodsDTO = Input<typeof CreateGoodsSchema>;
