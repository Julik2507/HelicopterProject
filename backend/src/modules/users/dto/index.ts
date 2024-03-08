import { object, string, Input, partial, optional } from "valibot";

export const changeUserSchema = partial(
  object({
    name: string(),
    email: string(),
  })
);

// export const changeUserSchema = partial(UserSchema);

export type ChangeUserDTO = Input<typeof changeUserSchema>;
