import { db } from "../../db/migrate.js";
import { and, eq, ilike } from "drizzle-orm";
import { attribute_values, goods, images } from "../../db/schema.js";

export async function getCommonThings(letters: string) {
  try {
    return await db
      .select({
        goods_id: goods.id,
        name: goods.name,
        img: images.img,
        price: attribute_values.value,
      })
      .from(goods)
      .innerJoin(images, eq(goods.img_id, images.id))
      .innerJoin(attribute_values, eq(goods.id, attribute_values.goods_id))
      .where(and(eq(attribute_values.attribute_id, 1), ilike(goods.name, `%${letters}%`)));
  } catch (error: any) {
    throw error;
  }
}
