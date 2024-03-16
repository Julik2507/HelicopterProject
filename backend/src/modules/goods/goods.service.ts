import path from "path";
import { db } from "../../db/migrate.js";
import { goods } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import * as uuid from "uuid";
import { fileURLToPath } from "url";
import { GetAnyGoods } from "./dto/index.js";

export async function createGoods(dto: any, img: any) {
  const image = img;

  let uniqueImgName = uuid.v4() + ".jpg";
  console.log(path.resolve() + "/images/" + uniqueImgName);

  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = dirname(__filename);

  // image.mv(path.resolve(__dirname, "../..", "static", uniqueImgName));
  // console.log(__dirname);

  // const oneGoods = {
  //   name: dto.name,
  //   price: dto.price,
  //   rating: 0,
  //   img: uniqueImgName,
  //   brand_id: dto.brand_id,
  //   type_id: dto.type_id,
  // };

  // return await db.insert(goods).values(oneGoods);
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
