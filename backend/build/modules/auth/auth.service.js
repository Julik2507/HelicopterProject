import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { basket, users } from "../../db/schema.js";
import { tokenJwt } from "./token/token.service.js";
import { saveToken } from "./token/token.service.js";
export async function registerUser(dto) {
    try {
        const existUser = await existUserByEmail(dto.email);
        if (existUser)
            throw new Error("Пользователь с данной электронной почтой существует!");
        dto.password = await hashPassword(dto.password);
        await db.insert(users).values({
            name: dto.name,
            email: dto.email,
            password: dto.password,
            role: "USER",
        });
        const result = await publicUser(dto.email);
        if (result == undefined)
            throw new Error("undefined");
        const userBasket = await db.insert(basket).values({ user_id: result.id });
        const token = await tokenJwt(result);
        const saveMyToken = await saveToken(result.id, token.refreshToken);
        return token;
    }
    catch (error) {
        throw error;
    }
}
export async function loginUser(dto) {
    try {
        const existEmail = await existUserByEmail(dto.email);
        if (!existEmail)
            throw new Error("Пользователя с такой электронной почтой или паролем не существует!");
        const correctPassword = await comparePassword(dto.password, existEmail.password);
        if (!correctPassword)
            throw new Error("Пользователя с такой электронной почтой или паролем не существует!");
        const token = await tokenJwt(existEmail);
        const saveMyToken = await saveToken(existEmail.id, token.refreshToken);
        return token;
    }
    catch (error) {
        throw error;
    }
}
export async function existUserByEmail(email) {
    return await db.query.users.findFirst({ where: eq(users.email, email) });
}
export async function publicUser(email) {
    return await db.query.users.findFirst({
        where: eq(users.email, email),
        columns: {
            id: true,
            name: true,
            password: false,
            email: true,
            role: true,
        },
    });
}
export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
export async function comparePassword(password, hashpassword) {
    return bcrypt.compare(password, hashpassword);
}
//# sourceMappingURL=auth.service.js.map