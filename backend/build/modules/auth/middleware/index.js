import jwt from "jsonwebtoken";
import { config } from "../../../configuration/index.js";
export function authMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization;
        if (!token)
            throw new Error("Your token doesnt exist!");
        console.log(token);
        const decodedData = jwt.verify(token, config.secret);
        req.user = decodedData;
        console.log(decodedData);
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(403).json({ message: "суета, и где-то ошибка в токене" });
    }
}
//# sourceMappingURL=index.js.map