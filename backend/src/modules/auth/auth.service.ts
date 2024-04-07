import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../../db/migrate.js";
import { basket, users } from "../../db/schema.js";
import { InsertUserDTO, LoginUserDTO } from "./dto/index.js";
import { tokenJwt } from "./token/token.service.js";
import { saveToken } from "./token/token.service.js";

export async function registerUser(dto: InsertUserDTO): Promise<any> {
  try {
    const existUser = await existUserByEmail(dto.email);
    if (existUser) throw new Error("Person with this email exist");
    dto.password = await hashPassword(dto.password);
    const user = {
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: "USER",
    };
    await db.insert(users).values(user);
    const result = await publicUser(user.email);
    if (result == undefined) throw new Error("undefined");

    const userBasket = await db.insert(basket).values({ user_id: result.id });

    const token = await tokenJwt(result);
    const saveMyToken = await saveToken(result.id, token.refreshToken);

    return token;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(dto: LoginUserDTO): Promise<any> {
  //issue
  try {
    const existEmail = await existUserByEmail(dto.email);
    if (!existEmail) throw new Error("User with this login or password doesnt exist");
    const correctPassword = await comparePassword(dto.password, existEmail.password);
    if (!correctPassword) throw new Error("User with this login or password doesnt exist");
    const token = await tokenJwt(existEmail);
    const saveMyToken = await saveToken(existEmail.id, token.refreshToken);
    // const result = await publicUser(dto.email);
    // if (result === undefined) {
    //   throw new Error("error");
    // }
    return token;
  } catch (error) {
    throw error;
  }
}

export async function existUserByEmail(email: string) {
  return await db.query.users.findFirst({ where: eq(users.email, email) });
}

export async function publicUser(email: string) {
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

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashpassword: string) {
  return bcrypt.compare(password, hashpassword);
}
