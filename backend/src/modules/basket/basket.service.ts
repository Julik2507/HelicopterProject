import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { basket, basketGoods, brands, goods, images, subtypes } from "../../db/schema.js";
import { ResSendDataToDeliveryDTO } from "./dto/basketDTO.js";

export async function putGoodsInBasket(goodsId: string, userId: number) {
  try {
    const myBasket = await findBasket(userId);
    const findQuantity = await findGoodsInUserBasket(goodsId, myBasket[0].id);

    if (findQuantity.length > 0) {
      await db
        .update(basketGoods)
        .set({ quantity: findQuantity[0].quantity! + 1 })
        .where(and(eq(basketGoods.basket_id, myBasket[0].id), eq(basketGoods.goods_id, Number(goodsId))));

      return getOneInfoToBasket(myBasket[0].id, goodsId);
    } else {
      await db.insert(basketGoods).values({
        goods_id: Number(goodsId),
        basket_id: myBasket[0].id,
        quantity: 1,
      });

      return getOneInfoToBasket(myBasket[0].id, goodsId);
    }
  } catch (error: any) {
    throw error;
  }
}

export async function getMyGoods(userId: number): Promise<any> {
  try {
    const myBasket = await findBasket(userId);

    const result = await db
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

    const info = await getSomeInfoToBasket(myBasket[0].id);

    return { result, info };
  } catch (error: any) {
    throw error;
  }
}

export async function minusQuantityGoodsInBasket(goodsId: string, userId: number) {
  try {
    const MyBasket = await findBasket(userId);
    const findQuantity = await findGoodsInUserBasket(goodsId, MyBasket[0].id);

    if (findQuantity[0].quantity === 1) {
      const deleteOneGoods = await deleteGoods(goodsId, userId);

      return deleteOneGoods;
    } else {
      const updateQuantity = await db
        .update(basketGoods)
        .set({ quantity: findQuantity[0].quantity! - 1 })
        .where(and(eq(basketGoods.basket_id, MyBasket[0].id), eq(basketGoods.goods_id, Number(goodsId))));

      return await getOneInfoToBasket(MyBasket[0].id, goodsId);
    }
  } catch (error: any) {
    throw error;
  }
}

export async function deleteGoods(goodsId: string, userId: number): Promise<any> {
  try {
    const myBasket = await findBasket(userId);
    const result = await db.delete(basketGoods).where(and(eq(basketGoods.basket_id, myBasket[0].id), eq(basketGoods.goods_id, Number(goodsId))));

    return await getMyGoods(userId);
    // const info = await getSomeInfoToBasket(myBasket[0].id);
  } catch (error: any) {
    throw error;
  }
}

export async function sendInfoToDelivery(dto: ResSendDataToDeliveryDTO, userId: number) {
  try {
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

    const info = await getSomeInfoToBasket(myBasket[0].id);

    return { result, info, dto };
  } catch (error: any) {
    throw error;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

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

export async function getSomeInfoToBasket(basketId: number) {
  let totalPriceCounter = 0;
  const result = await db
    .select({
      price: goods.price, //нужно для foreach
      quantity: basketGoods.quantity,
      singlePrice: sql<number>`${goods.price} * ${basketGoods.quantity}`,
    })
    .from(basketGoods)
    .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
    .where(eq(basketGoods.basket_id, basketId));

  result.forEach((element) => {
    totalPriceCounter += element.price! * element.quantity!;
  });

  return { result, totalPriceCounter };
}

export async function getOneInfoToBasket(basketId: number, goodsId: string) {
  let totalPriceCounter = 0;

  const result = await db
    .select({
      // price: goods.price, //нужно для foreach
      quantity: basketGoods.quantity,
      singlePrice: sql<number>`${goods.price} * ${basketGoods.quantity}`,
    })
    .from(basketGoods)
    .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
    .where(and(eq(basketGoods.basket_id, basketId), eq(basketGoods.goods_id, Number(goodsId))));

  const totalPriceCount = await db //отдельно для расчета для каждого товара в баскете СУММАРНОЙ СТОИМОСТИ
    .select({
      price: goods.price,
      quantity: basketGoods.quantity,
    })
    .from(basketGoods)
    .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
    .where(eq(basketGoods.basket_id, basketId));

  totalPriceCount.forEach((element) => {
    totalPriceCounter += element.price! * element.quantity!;
  });

  return { result, totalPriceCounter };
}
