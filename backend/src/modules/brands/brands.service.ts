import { db } from "../../db/migrate.js";
import { brands } from "../../db/schema.js";
import { BrandDTO } from "./dto/index.js";

export async function createBrand(dto: BrandDTO) {
  return await db.insert(brands).values(dto);
}

export async function getAllBrands() {
  return await db.select().from(brands);
}
