import { Output, object, string } from "valibot";

export const resTokenSchema = object({
  accessToken: string(),
  refreshToken: string(),
});

export type ResTokenDTO = Output<typeof resTokenSchema>;
