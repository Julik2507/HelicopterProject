import { string, email, object, number } from "valibot";
const responseRegisterSchema = object({
    id: number(),
    name: string(),
    email: string([email()]),
    role: string(),
});
export const responseLoginSchema = object({
    result: object({
        id: number(),
        name: string(),
        email: string(),
        role: string(),
    }),
    token: string(),
});
export const jwtTokenSchema = object({
    id: number(),
    name: string(),
    email: string(),
    password: string(),
    role: string(),
});
//# sourceMappingURL=index.js.map