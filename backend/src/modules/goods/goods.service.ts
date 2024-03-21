import path from "path";
import * as uuid from "uuid";
import { db } from "../../db/migrate.js";
import { goods, images, infoGoods } from "../../db/schema.js";
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

  const result = await db.insert(goods).values(oneGoods);
  const goodsInfo = await db.query.goods.findFirst({ where: eq(goods.name, oneGoods.name) });
  if (goodsInfo == undefined) throw new Error("goodsInfo is undefined");

  if (dto.info) {
    dto.info = JSON.parse(dto.info);
    dto.info.forEach((item: any) => {
      db.insert(infoGoods).values({
        title: item.title,
        description: item.description,
        goods_id: goodsInfo.id,
      });
    });
  }
  return result;
  //check goods' description!!!!!
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
  console.log(dto);

  const result = await db.select().from(goods).where(eq(goods.id, dto));
  console.log(result);

  // const goodsInfo = db.select().from(infoGoods).where(eq(infoGoods.goods_id, dto));
  const goodsInfo = await db.query.infoGoods.findMany({ where: eq(infoGoods.goods_id, dto) });

  return { result, goodsInfo };
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
  // const result = await db.select({ id: images.id }).from(images).where(eq(images.img, uniqueName));
  const result = await db.query.images.findFirst({ where: eq(images.img, uniqueName) });
  if (result == undefined) throw new Error("Result is undefined");
  console.log(result.id);
  return result.id;
}
