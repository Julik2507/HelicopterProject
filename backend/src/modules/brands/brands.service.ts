import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { brands } from "../../db/schema.js";
import { BrandDTO } from "./dto/index.js";

export async function createBrand(dto: BrandDTO) {
  try {
    await db.insert(brands).values(dto);
    return await db.query.brands.findFirst({ where: eq(brands.name, dto.name) });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function getAllBrands() {
  try {
    return await db.select().from(brands);
  } catch (error: any) {
    throw error;
  }
}
