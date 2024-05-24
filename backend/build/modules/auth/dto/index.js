import { string, email, object, minLength, partial, number } from "valibot";
export const loginSchema = object({
    email: string("uncorrect email or password", [email("Invalid type of email!")]),
    password: string("uncorrect email or password", [minLength(8, "Password must have 8 letters and more!")]),
});
export const registerSchema = object({
    name: string("your name is uncrorrect", [minLength(1, "Your name must have 1 letter and more!")]),
    email: string("your data are uncorrect", [email("Invalid type of email!")]),
    password: string("your data are uncorrect", [minLength(8, "Password must have 8 letters and more!")]),
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
export const changeNameSchema = partial(changeParamsSchema);
export const updateUserSchema = partial(registerSchema);
//# sourceMappingURL=index.js.map