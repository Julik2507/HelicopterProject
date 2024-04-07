import { Input, object, string } from "valibot";

export const brandSchema = object({
  name: string(),
});

export type BrandDTO = Input<typeof brandSchema>;
