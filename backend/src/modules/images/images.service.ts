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
  console.log(dto.image);

  const uniqueName = uuid.v4() + ".jpg";

  dto.image.mv(path.resolve(__dirname, "../..", "static", uniqueName));

  const img = {
    img: uniqueName,
  };
  await db.insert(images).values(img);

  const image = await db.query.images.findFirst({ where: eq(images.img, uniqueName) });
  if (image == undefined) throw new Error("Image is undefined");
  return image.id;
}
