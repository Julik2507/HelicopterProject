import { object, string, number, Input } from "valibot";

export const UserSchema = object({
  name: string(),
  role: string(),
  email: string(),
  user_id: number(),
});

export type UserSchemaDTO = Input<typeof UserSchema>;
