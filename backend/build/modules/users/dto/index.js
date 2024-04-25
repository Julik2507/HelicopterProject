import { object, string, partial } from "valibot";
export const changeUserSchema = partial(object({
    name: string(),
    email: string(),
}));
//# sourceMappingURL=index.js.map