import { db } from "../../db/migrate.js";
import { goods } from "../../db/schema.js";
export async function createGoods(dto) {
    return await db.insert(goods).values(dto);
}
//# sourceMappingURL=device.service.js.map