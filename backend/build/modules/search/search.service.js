import { db } from "../../db/migrate.js";
import { eq, ilike } from "drizzle-orm";
import { goods, images } from "../../db/schema.js";
export async function getCommonThings(letters) {
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
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=search.service.js.map