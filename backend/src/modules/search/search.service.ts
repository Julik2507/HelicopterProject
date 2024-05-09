import { db } from "../../db/migrate.js";
import { eq, ilike } from "drizzle-orm";
import { goods, images } from "../../db/schema.js";

export async function getCommonThings(letters: string) {
  try {
    return await db
      .select({
        goods_id: goods.id,
        name: goods.name,
        img: images.img,
      })
      .from(goods)
      .innerJoin(images, eq(goods.img_id, images.id))
      .where(ilike(goods.name, `%${letters}%`));
  } catch (error: any) {
    throw error;
  }
}
