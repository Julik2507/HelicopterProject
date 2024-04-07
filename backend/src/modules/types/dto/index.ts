import { Input, object, string } from "valibot";

export const typeSchema = object({
  name: string(),
});

export type TypeDTO = Input<typeof typeSchema>;
