import * as v from "valibot";

const registerSchema = v.object({
  name: v.string(),
  password: v.string(),
  email: v.string(),
});

export type registerDTO = v.Input<typeof registerSchema>;
