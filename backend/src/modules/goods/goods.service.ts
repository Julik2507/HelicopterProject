import { db } from "../../db/migrate.js";
import { attribute_values, attributes, brands, goods, images, infoGoods, subtypes } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { CreateGoodsDTO, GetAnyGoods } from "./dto/index.js";

export async function createGoods(dto: CreateGoodsDTO, imgID: number): Promise<any> {
  try {
    await db.insert(goods).values({ name: dto.name, price: dto.price, rating: 0, brand_id: dto.brand_id, subtype_id: dto.subtype_id, img_id: imgID });
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
    return await db.select({ name: goods.name }).from(goods).where(eq(goods.name, dto.name));
  } catch (error: any) {
    console.log(error);

    throw error;
  }
}

export async function getGoods(dto: GetAnyGoods): Promise<any> {
  try {
    let page = 1 || dto.page;
    let limit = 5;
    let offset = page * limit - limit;

    if (dto.type_id) {
      return await db
        .select({
          goods_id: goods.id,
          name: goods.name,
          price: goods.price,
          brand: brands.name,
          subtype: subtypes.name,
          img: images.img,
          weight: attribute_values.value,
        })
        .from(goods)
        .innerJoin(images, eq(goods.img_id, images.id))
        .innerJoin(brands, eq(goods.brand_id, brands.id))
        .innerJoin(subtypes, eq(goods.subtype_id, subtypes.id))
        .innerJoin(attribute_values, eq(goods.id, attribute_values.goods_id))
        .where(and(eq(subtypes.type_id, Number(dto.type_id)), eq(attribute_values.attribute_id, 1)))
        .offset(offset)
        .limit(limit);
    }
  } catch (error: any) {
    throw error;
  }
}

export async function getOneGoods(dto: string): Promise<any> {
  const good = await db
    .select({
      goods_id: goods.id,
      name: goods.name,
      brand: brands.name,
      subtype: subtypes.name,
      img: images.img,
    })
    .from(goods)
    .innerJoin(images, eq(images.id, goods.img_id))
    .innerJoin(brands, eq(goods.brand_id, brands.id))
    .innerJoin(subtypes, eq(goods.subtype_id, subtypes.id))
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
