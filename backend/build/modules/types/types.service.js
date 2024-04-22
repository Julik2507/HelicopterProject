import { db } from "../../db/migrate.js";
import { types } from "../../db/schema.js";
export async function createType(dto) {
    try {
        return await db.insert(types).values(dto);
    }
    catch (error) {
        throw error;
    }
}
export async function getAllTypes() {
    try {
        return await db.select().from(types);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=types.service.js.map