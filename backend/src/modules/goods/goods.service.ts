import { db } from "../../db/migrate.js";
import { attribute_values, attributes, goods, images, infoGoods } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { CreateGoodsDTO, GetAnyGoods } from "./dto/index.js";

export async function createGoods(dto: CreateGoodsDTO, imgID: number): Promise<any> {
  try {
    await db.insert(goods).values({ name: dto.name, price: dto.price, rating: 0, brand_id: dto.brand_id, type_id: dto.type_id, img_id: imgID });
    const createdGoods = await db.query.goods.findFirst({ where: eq(goods.img_id, imgID) });
    // const createdGoods = await db.select({ id: goods.id }).from(goods).where(eq(goods.img_id, imgID));
    if (createdGoods == undefined) throw new Error("undefined");
    await db.insert(attribute_values).values([
      {
        goods_id: createdGoods.id,
        attribute_id: 1,
        value: dto.value_1,
      },
      {
        goods_id: createdGoods.id,
        attribute_id: 2,
        value: dto.value_2,
      },
      {
        goods_id: createdGoods.id,
        attribute_id: 3,
        value: dto.value_3,
      },
      {
        goods_id: createdGoods.id,
        attribute_id: 4,
        value: dto.value_4,
      },
      {
        goods_id: createdGoods.id,
        attribute_id: 5,
        value: dto.value_5,
      },
      {
        goods_id: createdGoods.id,
        attribute_id: 6,
        value: dto.value_6,
      },
      {
        goods_id: createdGoods.id,
        attribute_id: 7,
        value: dto.value_7,
      },
      {
        goods_id: createdGoods.id,
        attribute_id: 8,
        value: dto.value_8,
      },
      {
        goods_id: createdGoods.id,
        attribute_id: 9,
        value: dto.value_9,
      },
    ]);
  } catch (error: any) {
    throw error;
  }
}

export async function getGoods(dto: GetAnyGoods): Promise<any> {
  try {
    let page = 1 || dto.page;
    let limit = 5;
    let offset = page * limit - limit;

    if (!dto.brand_id && !dto.type_id)
      return await db
        .select({
          id: goods.id,
          name: goods.name,
          brand_id: goods.brand_id,
          type_id: goods.type_id,
          img: images.img,
        })
        .from(goods)
        .innerJoin(images, eq(goods.img_id, images.id))
        .offset(offset)
        .limit(limit);
    else if (dto.brand_id && !dto.type_id)
      return await db
        .select({
          id: goods.id,
          name: goods.name,
          brand_id: goods.brand_id,
          type_id: goods.type_id,
          img: images.img,
        })
        .from(goods)
        .innerJoin(images, eq(goods.img_id, images.id))
        .where(eq(goods.brand_id, dto.brand_id))
        .offset(offset)
        .limit(limit);
    else if (!dto.brand_id && dto.type_id)
      return await db
        .select({
          id: goods.id,
          name: goods.name,
          brand_id: goods.brand_id,
          type_id: goods.type_id,
          img: images.img,
        })
        .from(goods)
        .innerJoin(images, eq(goods.img_id, images.id))
        .where(eq(goods.type_id, dto.type_id))
        .offset(offset)
        .limit(limit);
    else if (dto.brand_id && dto.type_id)
      return await db
        .select({
          id: goods.id,
          name: goods.name,
          brand_id: goods.brand_id,
          type_id: goods.type_id,
          img: images.img,
        })
        .from(goods)
        .innerJoin(images, eq(goods.img_id, images.id))
        .where(and(eq(goods.brand_id, dto.brand_id), eq(goods.type_id, dto.type_id)))
        .offset(offset)
        .limit(limit);
  } catch (error: any) {
    throw error;
  }
}

export async function getOneGoods(dto: string): Promise<any> {
  const good = await db
    .select({
      id: goods.id,
      name: goods.name,
      brand_id: goods.brand_id,
      type_id: goods.type_id,
      img: images.img,
    })
    .from(goods)
    .innerJoin(images, eq(images.id, goods.img_id))
    .where(eq(goods.id, Number(dto)));
  const description = await db
    .select({
      value: attribute_values.value,
      attribute: attributes.attribute,
    })
    .from(attribute_values)
    .innerJoin(attributes, eq(attribute_values.attribute_id, attributes.id))
    .where(eq(attribute_values.goods_id, Number(dto)));
  return { good, description };
}
