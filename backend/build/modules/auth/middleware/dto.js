import { object, string, number } from "valibot";
export const UserSchema = object({
    name: string(),
    role: string(),
    email: string(),
    user_id: number(),
});
//# sourceMappingURL=dto.js.map