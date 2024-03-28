import { object, string, minLength, email, type Input } from "valibot";

const registerSchema = object({
  name: string("your name is uncrorrect", [minLength(1)]),
  email: string("your data are uncorrect", [email()]),
  password: string("your data are uncorrect", [minLength(8)]),
});

export type registerDTO = Input<typeof registerSchema>;

export const loginSchema = object({
  email: string("uncorrect email or password", [email()]),
  password: string("uncorrect email or password", [minLength(8)]),
});

export type loginDTO = Input<typeof loginSchema>;
