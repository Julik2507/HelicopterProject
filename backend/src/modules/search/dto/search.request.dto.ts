import { object, string, Input } from "valibot";

export const searchSchemaReq = object({
  letters: string(),
});

export type SearchGoods = Input<typeof searchSchemaReq>;
