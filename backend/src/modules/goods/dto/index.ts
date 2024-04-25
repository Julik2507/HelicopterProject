import { varchar } from "drizzle-orm/mysql-core";
import { Input, any, number, object, partial, string } from "valibot";

export const getGoodsSchema = partial(
  object({
    page: string("Страница не найдена"),
    subtype_id: string("Тип не найден"),
  })
);
export type GetAnyGoods = Input<typeof getGoodsSchema>;

export const CreateGoodsSchema = object({
  name: string("Неправильный тип названия продукта"),
  price: string("Неверный тип стоимости"),
  brand_id: number("Неверный тип id"),
  subtype_id: number("Неверный тип id "),
  image: any(),
  value_1: string("Неверная характеристика продукта"),
  value_2: string("Неверная характеристика продукта"),
  value_3: string("Неверная характеристика продукта"),
  value_4: string("Неверная характеристика продукта"),
  value_5: string("Неверная характеристика продукта"),
  value_6: string("Неверная характеристика продукта"),
  value_7: string("Неверная характеристика продукта"),
  value_8: string("Неверная характеристика продукта"),
  value_9: string("Неверная характеристика продукта"),
});
export type CreateGoodsDTO = Input<typeof CreateGoodsSchema>;
