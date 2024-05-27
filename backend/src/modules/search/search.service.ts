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
        price: goods.price,
      })
      .from(goods)
      .innerJoin(images, eq(goods.img_id, images.id))
      .where(ilike(goods.name, `%${letters}%`));
  } catch (error: any) {
    throw error;
  }
}
