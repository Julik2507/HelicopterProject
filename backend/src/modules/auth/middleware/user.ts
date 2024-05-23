import { config } from "../../../configuration/index.js";
import jwt from "jsonwebtoken";

export function authMiddlewareUser(req: any, res: any, next: any) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Вы не авторизованы!");

    const decodedData = jwt.verify(token, config.secret_access);
    req.user = decodedData;
    // console.log(req.user);

    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
