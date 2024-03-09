import { string, email, object, minLength, Input, partial, number } from "valibot";

export const loginSchema = object({
  email: string("uncorrect email or password", [email()]),
  password: string("uncorrect email or password", [minLength(8)]),
});

export const registerSchema = object({
  name: string("your name is uncrorrect", [minLength(1)]),
  email: string("your data are uncorrect", [email()]),
  password: string("your data are uncorrect", [minLength(8)]),
});

export const changeParamsSchema = object({
  id: number(),
  email: string([email()]),
  name: string(),
  surname: string(),
});

export const changeNameSchema = partial(changeParamsSchema);
export const updateUserSchema = partial(registerSchema);

export type InsertUserDTO = Input<typeof registerSchema>;
export type LoginUserDTO = Input<typeof loginSchema>;
export type UpdateUserDto = Input<typeof updateUserSchema>;
export type changeNameDTO = Input<typeof changeNameSchema>;

// const fromDB = {
//   id: 1,
//   name: "aaa",
//   password: "qqq",
// };

// const res = { ...fromDB, password: "asdasdas" };
