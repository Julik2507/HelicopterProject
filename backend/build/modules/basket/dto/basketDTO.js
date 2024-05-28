import { object, number, string, nullable, optional, array, minLength, minValue } from "valibot";
const ResGetBasketSchema = object({
    goods_id: number(),
    goodsName: string(),
    goodsPrice: string(),
    brand: string(),
    subtype: string(),
    img: string(),
});
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
const ReqPutGoodsSchema = object({
    result: array(object({
        quantity: nullable(number()),
        singlePrice: number(),
    })),
    totalPriceCounter: number(),
});
const ReqGetMyGoodsSchema = object({
    result: array(object({
        goods_id: number(),
        goodsName: nullable(string()),
        goodsPrice: nullable(number()),
        brand: nullable(string()),
        subtype: nullable(string()),
        img: nullable(string()),
    })),
    info: object({
        result: array(object({
            price: nullable(number()),
            quantity: nullable(number()),
            singlePrice: number(),
        })),
        totalPriceCounter: number(),
    }),
});
//# sourceMappingURL=basketDTO.js.map