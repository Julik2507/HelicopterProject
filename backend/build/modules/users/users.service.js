import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { users } from "../../db/schema.js";
export async function updateUserData(id, dto) {
    try {
        console.log(dto);
        if (dto.email === undefined)
            throw new Error("undefined");
        const existData = await db.query.users.findFirst({ where: eq(users.email, dto.email) });
        if (existData)
            throw new Error("User with this email exist");
        const result = await db.update(users).set(dto).where(eq(users.id, id));
        return dto;
    }
    catch (error) {
        throw error;
    }
}
export async function deleteUserData(id) {
    const result = await db.delete(users).where(eq(users.id, id));
    return true;
}
//# sourceMappingURL=users.service.js.map