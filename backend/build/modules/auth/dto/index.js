import { string, email, object, minLength, partial, number } from "valibot";
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
//# sourceMappingURL=index.js.map