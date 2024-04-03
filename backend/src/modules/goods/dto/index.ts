import { Input, number, object, partial, string } from "valibot";

export const getGoodsSchema = partial(
  object({
    page: number("Страница не найдена"),
    type_id: number("Тип не найден"),
    brand_id: number("Бренд не найден"),
  })
);

export type GetAnyGoods = Input<typeof getGoodsSchema>;
