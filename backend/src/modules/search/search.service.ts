import { db } from "../../db/migrate.js";
import { ilike } from "drizzle-orm";
import { goods } from "../../db/schema.js";
import { SearchGoods } from "./dto/search.request.dto.js";

export async function getCommonThings(letters: string) {
  try {
    return await db
      .select()
      .from(goods)
      .where(ilike(goods.name, `%${letters}%`));
  } catch (error: any) {
    throw error;
  }
}
