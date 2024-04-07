import jwt from "jsonwebtoken";
import { config } from "../../../configuration/index.js";
import { ResTokenDTO } from "./response/index.js";
import { eq } from "drizzle-orm";
import { tokens } from "../../../db/schema.js";
import { db } from "../../../db/migrate.js";

//create jwt
export async function tokenJwt(payload: any): Promise<ResTokenDTO> {
  const accessToken = jwt.sign(payload, config.secret_access, {
    expiresIn: config.expireAccess,
  });
  const refreshToken = jwt.sign(payload, config.secret_refresh, {
    expiresIn: config.expireRefresh,
  });
  return { accessToken, refreshToken };
}

//save jwt for user into db
export async function saveToken(userID: number, refreshToken: any) {
  const tokenData = await db.select().from(tokens).where(eq(tokens.user_id, userID));

  if (tokenData) {
    await db.update(tokens).set({ token: refreshToken }).where(eq(tokens.user_id, userID));
  } else if (!tokenData) {
    const setFirstToken = await db.insert(tokens).values({
      user_id: userID,
      token: refreshToken,
    });
  }
}
