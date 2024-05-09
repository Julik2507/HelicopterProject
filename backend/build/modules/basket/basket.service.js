import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { basket, basketGoods } from "../../db/schema.js";
export async function putGoodsInBasket(goodsId, userId) {
    const myBasket = await findBasket(userId);
    console.log(myBasket[0].id);
    const usersBasket = await db.insert(basketGoods).values({
        goods_id: Number(goodsId),
        basket_id: myBasket[0].id,
    });
}
export async function getMyGoods(userId) {
    const myBasket = await findBasket(userId);
    return await db
        .select({
        goodsId: basketGoods.goods_id,
    })
        .from(basketGoods)
        .where(eq(basketGoods.basket_id, myBasket[0].id));
}
export async function findBasket(id) {
    return await db
        .select({
        id: basket.id,
    })
        .from(basket)
        .where(eq(basket.user_id, id));
}
//# sourceMappingURL=basket.service.js.map