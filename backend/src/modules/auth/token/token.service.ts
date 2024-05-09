import jwt from "jsonwebtoken";
import { config } from "../../../configuration/index.js";
import { ResTokenDTO } from "./response/index.js";
import { eq } from "drizzle-orm";
import { db } from "../../../db/migrate.js";
import { tokens, users } from "../../../db/schema.js";
import { publicUser } from "../auth.service.js";
import { log } from "console";

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
export async function saveToken(userID: number, refreshToken: string) {
  const tokenData = await db.select().from(tokens).where(eq(tokens.user_id, userID));

  if (tokenData) {
    await db.update(tokens).set({ token: refreshToken }).where(eq(tokens.user_id, userID));
  } else {
    await db.insert(tokens).values({
      token: refreshToken,
      user_id: userID,
    });
  }
}

//update access&refresh, when access expired
export async function updateTokens(refreshToken: string) {
  const compareRefreshToken = await db.select().from(tokens).where(eq(tokens.token, refreshToken));

  const verifyToken = jwt.verify(refreshToken, config.secret_refresh);

  if (!compareRefreshToken && !verifyToken) throw new Error("Пользователь неавторизован!");

  const findUser = await db.select().from(users).where(eq(users.id, compareRefreshToken[0].user_id!));

  const twoTokens = await tokenJwt(findUser[0]);

  await db.update(tokens).set({ token: twoTokens.refreshToken }).where(eq(tokens.user_id, findUser[0].id));
  console.log("tokens updated");

  return twoTokens;
}
