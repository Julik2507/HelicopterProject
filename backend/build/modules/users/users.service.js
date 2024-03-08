import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { users } from "../../db/schema.js";
export async function updateUserData(id, dto) {
    const result = await db.update(users).set(dto).where(eq(users.id, id));
    return dto;
}
export async function deleteUserData(id) {
    const result = await db.delete(users).where(eq(users.id, id));
    return true;
}
//# sourceMappingURL=users.service.js.map