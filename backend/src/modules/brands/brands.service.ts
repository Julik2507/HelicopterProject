import { db } from "../../db/migrate.js";
import { brands } from "../../db/schema.js";
import { BrandDTO } from "./dto/index.js";

export async function createBrand(dto: BrandDTO) {
  const brand = {
    name: dto.name,
  };
  return await db.insert(brands).values(brand);
}

export async function getAllBrands() {
  return await db.select().from(brands);
}
