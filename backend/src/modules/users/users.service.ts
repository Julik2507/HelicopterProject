import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { users } from "../../db/schema.js";
import { ChangeUserDTO } from "./dto/index.js";

export async function updateUserData(id: number, dto: ChangeUserDTO): Promise<ChangeUserDTO> {
  try {
    const result = await db.update(users).set(dto).where(eq(users.id, id));
    return dto;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteUserData(id: number): Promise<boolean> {
  const result = await db.delete(users).where(eq(users.id, id));
  return true;
}
//hepu
