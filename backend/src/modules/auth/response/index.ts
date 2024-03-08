import { string, email, object, minLength, Input, partial, number, Output } from "valibot";

const responseRegisterSchema = object({
  id: number(),
  name: string(),
  email: string([email()]),
  role: string(),
});
export type responseRegisterDTO = Output<typeof responseRegisterSchema>;
//

export const responseLoginSchema = object({
  result: object({
    id: number(),
    name: string(),
    email: string(),
    role: string(),
  }),
  token: string(),
});
export type responseLoginDTO = Output<typeof responseLoginSchema>;

//

export const jwtTokenSchema = object({
  id: number(),
  name: string(),
  email: string(),
  password: string(),
  role: string(),
});
export type jwtTokenDTO = Input<typeof jwtTokenSchema>;
