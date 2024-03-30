import path from "path";
import * as uuid from "uuid";
import { db } from "../../db/migrate.js";
import { goods, images, infoGoods } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { fileURLToPath } from "url";
import { dirname } from "path";

export async function uploadImg(dto: any): Promise<any> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const uniqueName = uuid.v4() + ".jpg";
  console.log(dto);

  dto.img.mv(path.resolve(__dirname, "../..", "static", uniqueName));
  const img = {
    img: uniqueName,
  };
  await db.insert(images).values(img);
  const result = await db.query.images.findFirst({ where: eq(images.img, uniqueName) });
  if (result == undefined) throw new Error("Result is undefined");
  console.log(result.id);
  return result.id;
}
