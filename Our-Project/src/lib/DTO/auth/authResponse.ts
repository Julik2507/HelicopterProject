import { number, object, string, type Output, pick } from "valibot";

export const globalSchema = object({
  email: string(),
  name: string(),
  id: number(),
  role: string(),
  token: string(),
});

export const resRegisterSchema = pick(globalSchema, [
  "id",
  "name",
  "email",
  "role",
]);

export type ResRegisterDTO = Output<typeof resRegisterSchema>;

////

export const resLoginSchema = pick(globalSchema, [
  "name",
  "email",
  "role",
  "token",
]);

export type ResLoginDTO = Output<typeof resLoginSchema>;
