import jwt from "jsonwebtoken";
import { config } from "../../../configuration/index.js";
export async function tokenJwt(user) {
    const payload = user;
    const token = jwt.sign(payload, config.secret, {
        expiresIn: config.expire,
    });
    return token;
}
//# sourceMappingURL=index.js.map