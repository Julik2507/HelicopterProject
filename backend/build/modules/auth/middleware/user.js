import { config } from "../../../configuration/index.js";
import jwt from "jsonwebtoken";
export function authMiddlewareUser(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token)
            throw new Error("You didnt authorize");
        const decodedData = jwt.verify(token, config.secret);
        req.user = decodedData;
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: e.message });
    }
}
//# sourceMappingURL=user.js.map