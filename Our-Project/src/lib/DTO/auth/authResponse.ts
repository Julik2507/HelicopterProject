import { number, object, string, type Output, pick } from "valibot";

export const globalSchema = object({
  email: string(),
  name: string(),
  id: number(),
  role: string(),
  accessToken: string(),
  refreshToken: string(),
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
  "refreshToken",
  "accessToken",
]);

export type ResLoginDTO = Output<typeof resLoginSchema>;
