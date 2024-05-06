import jwt from "jsonwebtoken";
import { config } from "../../../configuration/index.js";
import { eq } from "drizzle-orm";
import { db } from "../../../db/migrate.js";
import { tokens, users } from "../../../db/schema.js";
export async function tokenJwt(payload) {
    const accessToken = jwt.sign(payload, config.secret_access, {
        expiresIn: config.expireAccess,
    });
    const refreshToken = jwt.sign(payload, config.secret_refresh, {
        expiresIn: config.expireRefresh,
    });
    return { accessToken, refreshToken };
}
export async function saveToken(userID, refreshToken) {
    const tokenData = await db.select().from(tokens).where(eq(tokens.user_id, userID));
    if (tokenData) {
        await db.update(tokens).set({ token: refreshToken }).where(eq(tokens.user_id, userID));
    }
    else {
        await db.insert(tokens).values({
            token: refreshToken,
            user_id: userID,
        });
    }
}
export async function updateTokens(refreshToken) {
    const compareRefreshToken = await db.select().from(tokens).where(eq(tokens.token, refreshToken));
    const verifyToken = jwt.verify(refreshToken, config.secret_refresh);
    if (!compareRefreshToken || !verifyToken)
        throw new Error("Пользователь неавторизован!");
    const findUser = await db.select().from(users).where(eq(users.id, compareRefreshToken.user_id));
    const twoTokens = await tokenJwt(findUser);
    await db.update(tokens).set({ token: twoTokens.refreshToken }).where(eq(tokens.user_id, findUser.id));
    return twoTokens;
}
//# sourceMappingURL=token.service.js.map