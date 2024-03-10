import { db } from "../../db/migrate.js";
import { types } from "../../db/schema.js";

export async function createType(dto: any) {
  const result = await db.insert(types).values(dto);
  return result;
}

export async function getAllTypes() {
  return await db.select().from(types);
}
