import jwt from "jsonwebtoken";
import { config } from "../../../configuration/index.js";
import { jwtTokenDTO } from "../response/index.js";

export async function tokenJwt(user: jwtTokenDTO): Promise<string> {
  const payload = user;
  const token = jwt.sign(payload, config.secret!, {
    expiresIn: config.expire,
  });
  return token;
}
