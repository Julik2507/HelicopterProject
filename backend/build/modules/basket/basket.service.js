import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { basket, basketGoods, brands, goods, images, subtypes } from "../../db/schema.js";
export async function putGoodsInBasket(goodsId, userId) {
    try {
        const myBasket = await findBasket(userId);
        const findQuantity = await findGoodsInUserBasket(goodsId, myBasket[0].id);
        if (findQuantity.length > 0) {
            await db
                .update(basketGoods)
                .set({ quantity: findQuantity[0].quantity + 1 })
                .where(and(eq(basketGoods.basket_id, myBasket[0].id), eq(basketGoods.goods_id, Number(goodsId))));
            return getOneInfoToBasket(myBasket[0].id, goodsId);
        }
        else {
            await db.insert(basketGoods).values({
                goods_id: Number(goodsId),
                basket_id: myBasket[0].id,
                quantity: 1,
            });
            return getOneInfoToBasket(myBasket[0].id, goodsId);
        }
    }
    catch (error) {
        throw error;
    }
}
export async function getMyGoods(userId) {
    console.log(userId);
    try {
        const myBasket = await findBasket(userId);
        console.log(myBasket[0].id);
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
    }
    catch (error) {
        throw error;
    }
}
export async function minusQuantityGoodsInBasket(goodsId, userId) {
    try {
        const MyBasket = await findBasket(userId);
        const findQuantity = await findGoodsInUserBasket(goodsId, MyBasket[0].id);
        if (findQuantity[0].quantity === 1) {
            return await deleteGoods(goodsId, userId);
        }
        else {
            const updateQuantity = await db
                .update(basketGoods)
                .set({ quantity: findQuantity[0].quantity - 1 })
                .where(and(eq(basketGoods.basket_id, MyBasket[0].id), eq(basketGoods.goods_id, Number(goodsId))));
            return await getOneInfoToBasket(MyBasket[0].id, goodsId);
        }
    }
    catch (error) {
        throw error;
    }
}
export async function deleteGoods(goodsId, userId) {
    try {
        const myBasket = await findBasket(userId);
        const result = await db.delete(basketGoods).where(and(eq(basketGoods.basket_id, myBasket[0].id), eq(basketGoods.goods_id, Number(goodsId))));
        return await getMyGoods(userId);
    }
    catch (error) {
        throw error;
    }
}
export async function sendInfoToDelivery(dto, userId) {
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
    }
    catch (error) {
        throw error;
    }
}
export async function getTotalPrice(userId) {
    try {
        let totalPrice = 0;
        const myBasket = await findBasket(userId);
        const result = await db
            .select({
            price: goods.price,
            quantity: basketGoods.quantity,
        })
            .from(basketGoods)
            .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
            .where(eq(basketGoods.basket_id, myBasket[0].id));
        result.forEach((element) => {
            totalPrice += element.price * element.quantity;
        });
        return { totalPrice };
    }
    catch (error) {
        throw error;
    }
}
export async function findBasket(id) {
    return await db
        .select({
        id: basket.id,
    })
        .from(basket)
        .where(eq(basket.user_id, id));
}
export async function findGoodsInUserBasket(goodsId, basketId) {
    return await db
        .select()
        .from(basketGoods)
        .where(and(eq(basketGoods.goods_id, Number(goodsId)), eq(basketGoods.basket_id, basketId)));
}
export async function getSomeInfoToBasket(basketId) {
    let totalPriceCounter = 0;
    const result = await db
        .select({
        price: goods.price,
        quantity: basketGoods.quantity,
        singlePrice: sql `${goods.price} * ${basketGoods.quantity}`,
    })
        .from(basketGoods)
        .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
        .where(eq(basketGoods.basket_id, basketId));
    result.forEach((element) => {
        totalPriceCounter += element.price * element.quantity;
    });
    return { result, totalPriceCounter };
}
export async function getOneInfoToBasket(basketId, goodsId) {
    let totalPriceCounter = 0;
    const result = await db
        .select({
        quantity: basketGoods.quantity,
        singlePrice: sql `${goods.price} * ${basketGoods.quantity}`,
    })
        .from(basketGoods)
        .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
        .where(and(eq(basketGoods.basket_id, basketId), eq(basketGoods.goods_id, Number(goodsId))));
    const totalPriceCount = await db
        .select({
        price: goods.price,
        quantity: basketGoods.quantity,
    })
        .from(basketGoods)
        .innerJoin(goods, eq(basketGoods.goods_id, goods.id))
        .where(eq(basketGoods.basket_id, basketId));
    totalPriceCount.forEach((element) => {
        totalPriceCounter += element.price * element.quantity;
    });
    return { result, totalPriceCounter };
}
//# sourceMappingURL=basket.service.js.map