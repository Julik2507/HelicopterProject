import { db } from "../../db/migrate.js";
import { types } from "../../db/schema.js";
import { TypeDTO } from "./dto/index.js";

export async function createType(dto: TypeDTO) {
  const result = await db.insert(types).values(dto);
  return result;
}

export async function getAllTypes() {
  return await db.select().from(types);
}
