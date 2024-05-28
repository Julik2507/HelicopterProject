import { string, email, object, minLength, partial, number } from "valibot";
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
export const changeNameSchema = partial(changeParamsSchema);
export const updateUserSchema = partial(registerSchema);
//# sourceMappingURL=index.js.map