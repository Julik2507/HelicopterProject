import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { basket, tokens, users } from "../../db/schema.js";
import { InsertUserDTO, LoginUserDTO, publicUserDTO } from "./dto/index.js";
import { tokenJwt } from "./token/token.service.js";
import { saveToken } from "./token/token.service.js";
import cookieParser from "cookie-parser";

export async function registerUser(dto: InsertUserDTO): Promise<any> {
  try {
    const existUser = await existUserByEmail(dto.email);
    if (existUser) throw new Error("Пользователь с данной электронной почтой существует!");
    dto.password = await hashPassword(dto.password);
    await db.insert(users).values({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: "USER",
    });

    const user = await publicUser(dto.email);
    if (user == undefined) throw new Error("undefined");

    const userBasket = await db.insert(basket).values({ user_id: user[0].id });
    console.log(user);

    const twoTokens = await tokenJwt(user[0]);

    // const saveOrUpdMyToken = await saveToken(user.id, twoTokens.refreshToken); не работает

    const saveToken = await db.insert(tokens).values({
      token: twoTokens.refreshToken,
      user_id: user[0].id,
    });

    return twoTokens;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(dto: LoginUserDTO): Promise<any> {
  try {
    const existEmail = await existUserByEmail(dto.email);
    if (!existEmail) throw new Error("Пользователя с такой электронной почтой или паролем не существует!");
    const correctPassword = await comparePassword(dto.password, existEmail.password);
    if (!correctPassword) throw new Error("Пользователя с такой электронной почтой или паролем не существует!");

    const twoTokens = await tokenJwt(existEmail);
    const saveToken = await db.update(tokens).set({ token: twoTokens.refreshToken }).where(eq(tokens.user_id, existEmail.id));

    // const saveMyToken = await saveToken(existEmail.id, twoTokens.refreshToken);

    return twoTokens;
  } catch (error) {
    throw error;
  }
}

//не удаляет строку в tokens(DB)
export async function logoutUser(refreshToken: string) {
  try {
    await db.delete(tokens).where(eq(tokens.token, refreshToken));
  } catch (error) {
    throw error;
  }
}

export async function existUserByEmail(email: string) {
  return await db.query.users.findFirst({ where: eq(users.email, email) });
}

// export async function publicUser(email: string) {
//   return await db.query.users.findFirst({
//     where: eq(users.email, email),
//     columns: {
//       id: true,
//       name: true,
//       password: false,
//       email: true,
//       role: true,
//     },
//   });
// }

export async function publicUser(email: string): Promise<Array<publicUserDTO>> {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return result;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashpassword: string) {
  return bcrypt.compare(password, hashpassword);
}

export async function getBasketId(id: number) {
  return await db
    .select({
      id: basket.id,
    })
    .from(basket)
    .where(eq(basket.user_id, id));
}
