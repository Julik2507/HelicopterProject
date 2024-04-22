import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { brands } from "../../db/schema.js";
export async function createBrand(dto) {
    try {
        await db.insert(brands).values(dto);
        return await db.query.brands.findFirst({ where: eq(brands.name, dto.name) });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
export async function getAllBrands() {
    try {
        return await db.select().from(brands);
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=brands.service.js.map