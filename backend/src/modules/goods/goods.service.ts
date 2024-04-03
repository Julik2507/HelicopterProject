import { db } from "../../db/migrate.js";
import { attribute_values, attributes, goods, images, infoGoods } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { CreateGoodsDTO, GetAnyGoods } from "./dto/index.js";

export async function createGoods(dto: CreateGoodsDTO, imgID: number): Promise<any> {
  try {
    const oneGoods = {
      name: dto.name,
      price: dto.price,
      rating: 0,
      brand_id: dto.brand_id,
      type_id: dto.type_id,
      img_id: imgID,
    };
    return await db.insert(goods).values(oneGoods);
    // реализовать добавление описания через фронт(аттрибут, значение)
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
      return await db.select().from(goods).innerJoin(images, eq(goods.img_id, images.id)).offset(offset).limit(limit);
    else if (dto.brand_id && !dto.type_id)
      return await db
        .select()
        .from(goods)
        .innerJoin(images, eq(goods.img_id, images.id))
        .where(eq(goods.brand_id, dto.brand_id))
        .offset(offset)
        .limit(limit);
    else if (!dto.brand_id && dto.type_id)
      return await db
        .select()
        .from(goods)
        .innerJoin(images, eq(goods.img_id, images.id))
        .where(eq(goods.type_id, dto.type_id))
        .offset(offset)
        .limit(limit);
    else if (dto.brand_id && dto.type_id)
      return await db
        .select()
        .from(goods)
        .innerJoin(images, eq(goods.img_id, images.id))
        .where(and(eq(goods.brand_id, dto.brand_id), eq(goods.type_id, dto.type_id)))
        .offset(offset)
        .limit(limit);
  } catch (error: any) {
    throw error;
  }
}

export async function getOneGoods(dto: any): Promise<any> {
  const good = await db.select().from(goods).innerJoin(images, eq(images.id, goods.img_id)).where(eq(goods.id, dto));
  const description = await db
    .select({
      value: attribute_values.value,
      attribute: attributes.attribute,
    })
    .from(attribute_values)
    .innerJoin(attributes, eq(attribute_values.attribute_id, attributes.id))
    .where(eq(attribute_values.goods_id, dto));
  return { good, description };
}
