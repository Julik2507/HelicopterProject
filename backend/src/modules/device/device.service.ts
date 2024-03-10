import { db } from "../../db/migrate.js";
import { goods } from "../../db/schema.js";

export async function createGoods(dto: any) {
  db.insert(goods).values(dto);
}
