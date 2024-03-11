import { db } from "../../db/migrate.js";
import { goods } from "../../db/schema.js";

export async function createGoods(dto: any, fileName: any) {
  const oneGoods = {
    name: dto.name,
    price: dto.price,
    rating: 0,
    brand_id: dto.brand_id,
    type_id: dto.type_id,
    img: fileName,
  };
  return await db.insert(goods).values(oneGoods);
}
