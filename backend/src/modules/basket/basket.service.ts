import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { basket, basketGoods, brands, goods, images, subtypes } from "../../db/schema.js";
import { brand } from "valibot";
import { GetBasketDTO } from "./dto/basketDTO.js";

export async function putGoodsInBasket(goodsId: string, userId: number): Promise<void> {
  const myBasket = await findBasket(userId);

  const usersBasket = await db.insert(basketGoods).values({
    goods_id: Number(goodsId),
    basket_id: myBasket[0].id,
  });
}

export async function getMyGoods(userId: number): Promise<Array<any>> {
  const myBasket = await findBasket(userId);
  return await db
    .select({
      goods_id: goods.id,
      goodsName: goods.name,
      goodsPrice: goods.price,
      brand: brands.name,
      subtype: subtypes.name,
      img: images.img,
    })
    .from(basketGoods)
    .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
    .innerJoin(brands, eq(goods.brand_id, brands.id))
    .innerJoin(images, eq(goods.img_id, images.id))
    .innerJoin(subtypes, eq(subtypes.id, goods.subtype_id))
    .where(eq(basketGoods.basket_id, myBasket[0].id));
}

export async function findBasket(id: number) {
  return await db
    .select({
      id: basket.id,
    })
    .from(basket)
    .where(eq(basket.user_id, id));
}
