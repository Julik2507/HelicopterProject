import { db } from "../../db/migrate.js";
import { eq } from "drizzle-orm";
import { basket, basketGoods, infoGoods } from "../../db/schema.js";

export async function takeGoods(dto: any) {
  const myBasket = await db.query.basket.findFirst({ where: eq(basket.user_id, dto.user_id) });
  const myBasketGoods = {
    basket_id: myBasket!.id,
    goods_id: dto.goods_id,
  };
  await db.insert(basketGoods).values(myBasketGoods);
  return myBasket!.id;
}

export async function getBasketGoods(dto: any) {
  return await db.query.basketGoods.findMany({ where: eq(basketGoods.basket_id, dto.id) });
}
