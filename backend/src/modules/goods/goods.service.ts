import path from "path";
import * as uuid from "uuid";
import { db } from "../../db/migrate.js";
import { goods, images } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { fileURLToPath } from "url";
import { GetAnyGoods } from "./dto/index.js";
import { dirname } from "path";

export async function createGoods(dto: any, img_id: number) {
  const oneGoods = {
    name: dto.name,
    price: dto.price,
    rating: 0,
    brand_id: dto.brand_id,
    type_id: dto.type_id,
    img_id: img_id,
  };

  return await db.insert(goods).values(oneGoods);
  //реализовать логику добавления описания!
}

export async function getGoods(dto: GetAnyGoods) {
  let page = 1 || dto.page;
  let limit = 1;
  let offset = page * limit - limit;
  console.log(page);
  console.log(limit);

  if (!dto.brand_id && !dto.type_id) return await db.select().from(goods).offset(offset).limit(limit);
  if (dto.brand_id && !dto.type_id) return await db.select().from(goods).where(eq(goods.brand_id, dto.brand_id)).offset(offset).limit(limit);
  if (!dto.brand_id && dto.type_id) return await db.select().from(goods).where(eq(goods.type_id, dto.type_id)).offset(offset).limit(limit);
  if (dto.brand_id && dto.type_id)
    return await db
      .select()
      .from(goods)
      .where(and(eq(goods.brand_id, dto.brand_id), eq(goods.type_id, dto.type_id)))
      .offset(offset)
      .limit(limit);
}

export async function getOneGoods(dto: any) {
  const result = await db.select().from(goods).where(eq(goods.id, dto.goods_id));
  console.log(result);

  return result;
}

export async function uploadImg(dto: any): Promise<any> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const uniqueName = uuid.v4() + ".jpg";
  dto.img.mv(path.resolve(__dirname, "../..", "static", uniqueName));
  const img = {
    img: uniqueName,
  };
  await db.insert(images).values(img);
  const result = await db.select({ id: images.id }).from(images).where(eq(images.img, uniqueName));
  console.log(result);
  return result;
}
