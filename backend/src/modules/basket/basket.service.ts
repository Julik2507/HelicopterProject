import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { basket, basketGoods, brands, goods, images, subtypes } from "../../db/schema.js";
import { ResSendDataToDeliveryDTO } from "./dto/basketDTO.js";

export async function putGoodsInBasket(goodsId: string, userId: number) {
  try {
    const myBasket = await findBasket(userId);

    const findQuantity = await findGoodsInUserBasket(goodsId, myBasket[0].id);

    if (findQuantity.length > 0) {
      return await db
        .update(basketGoods)
        .set({ quantity: findQuantity[0].quantity! + 1 })
        .where(and(eq(basketGoods.basket_id, myBasket[0].id), eq(basketGoods.goods_id, Number(goodsId))))
        .returning({ quantity: basketGoods.quantity });
    } else {
      return await db
        .insert(basketGoods)
        .values({
          goods_id: Number(goodsId),
          basket_id: myBasket[0].id,
          quantity: 1,
        })
        .returning({ quantity: basketGoods.quantity });
    }
  } catch (error: any) {
    throw error;
  }
}

export async function getMyGoods(userId: number): Promise<any> {
  let totalPriceCounter = 0;

  const myBasket = await findBasket(userId);
  const result = await db
    .select({
      goods_id: goods.id,
      goodsName: goods.name,
      goodsPrice: goods.price,
      brand: brands.name,
      subtype: subtypes.name,
      img: images.img,
      singlePrice: sql<number>`${goods.price} * ${basketGoods.quantity}`,
    })
    .from(basketGoods)
    .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
    .innerJoin(brands, eq(goods.brand_id, brands.id))
    .innerJoin(images, eq(goods.img_id, images.id))
    .innerJoin(subtypes, eq(subtypes.id, goods.subtype_id))
    .where(eq(basketGoods.basket_id, myBasket[0].id));

  result.forEach((element) => {
    totalPriceCounter += element.goodsPrice!;
  });

  return { result, totalPriceCounter };
}

export async function minusQuantityGoodsInBasket(goodsId: string, userId: number) {
  const MyBasket = await findBasket(userId);
  const findQuantity = await findGoodsInUserBasket(goodsId, MyBasket[0].id);

  if (findQuantity[0].quantity === 1) {
    return await deleteGoods(goodsId, userId);
  } else {
    return await db
      .update(basketGoods)
      .set({ quantity: findQuantity[0].quantity! - 1 })
      .where(and(eq(basketGoods.basket_id, MyBasket[0].id), eq(basketGoods.goods_id, Number(goodsId))))
      .returning({ quantity: basketGoods.quantity });
  }
}

export async function deleteGoods(goodsId: string, userId: number): Promise<any> {
  const userBasket = await findBasket(userId);
  const result = await db.delete(basketGoods).where(and(eq(basketGoods.basket_id, userBasket[0].id), eq(basketGoods.goods_id, Number(goodsId))));

  return getMyGoods(userId);
}

export async function sendInfoToDelivery(dto: ResSendDataToDeliveryDTO, userId: number) {
  const myBasket = await findBasket(userId);
  const result = await db
    .select({
      goodsName: goods.name,
      goodsPrice: goods.price,
      brand: brands.name,
      subtype: subtypes.name,
    })
    .from(basketGoods)
    .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
    .innerJoin(brands, eq(goods.brand_id, brands.id))
    .innerJoin(subtypes, eq(goods.subtype_id, subtypes.id))
    .where(eq(basketGoods.basket_id, myBasket[0].id));

  return { result, dto };
}

export async function findBasket(id: number) {
  return await db
    .select({
      id: basket.id,
    })
    .from(basket)
    .where(eq(basket.user_id, id));
}

export async function findGoodsInUserBasket(goodsId: string, basketId: number) {
  return await db
    .select()
    .from(basketGoods)
    .where(and(eq(basketGoods.goods_id, Number(goodsId)), eq(basketGoods.basket_id, basketId)));
}
