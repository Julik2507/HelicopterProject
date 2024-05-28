import { string, email, object, minLength, Input, partial, number, Output } from "valibot";

export const loginSchema = object({
  email: string([email("Неправильный тип электронной почты!")]),
  password: string([minLength(8, "Пароль должен иметь 8 символов и более!")]),
});

export const registerSchema = object({
  name: string([minLength(1, "Ваше имя должно содержать как минимум 1 букву!")]),
  email: string([email("Неправильный тип электронной почты!")]),
  password: string([minLength(8, "Пароль должен иметь 8 символов и более!")]),
});

export const changeParamsSchema = object({
  id: number(),
  email: string([email()]),
  name: string(),
  surname: string(),
});

export const publicUserChema = object({
  id: number(),
  name: string(),
  email: string(),
  role: string(),
});

export type publicUserDTO = Output<typeof publicUserChema>;
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
