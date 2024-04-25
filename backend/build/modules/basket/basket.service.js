import { db } from "../../db/migrate.js";
import { eq } from "drizzle-orm";
import { basket, basketGoods } from "../../db/schema.js";
export async function sendGoods(dto) {
    const myBasket = await db.query.basket.findFirst({ where: eq(basket.user_id, dto.user_id) });
    const myBasketGoods = {
        basket_id: myBasket.id,
        goods_id: dto.goods_id,
    };
    await db.insert(basketGoods).values(myBasketGoods);
    return myBasket === null || myBasket === void 0 ? void 0 : myBasket.id;
}
export async function getBasketGoods(dto) {
    const result = await db.query.basketGoods.findMany({
        where: eq(basketGoods.basket_id, dto),
        with: {
            goods: true,
        },
    });
    return result;
}
//# sourceMappingURL=basket.service.js.map