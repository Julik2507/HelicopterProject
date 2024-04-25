import { object, string } from "valibot";
export const resTokenSchema = object({
    accessToken: string(),
    refreshToken: string(),
});
//# sourceMappingURL=index.js.map