import { db } from "../../db/migrate.js";
import { types } from "../../db/schema.js";
import { TypeDTO } from "./dto/index.js";

export async function createType(dto: TypeDTO) {
  try {
    return await db.insert(types).values(dto);
  } catch (error: any) {
    throw error;
  }
}

export async function getAllTypes() {
  try {
    return await db.select().from(types);
  } catch (error: any) {
    throw error;
  }
}
