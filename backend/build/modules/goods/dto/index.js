import { any, number, object, partial, string } from "valibot";
export const getGoodsSchema = partial(object({
    page: string("Страница не найдена"),
    type_id: string("Тип не найден"),
}));
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
//# sourceMappingURL=index.js.map