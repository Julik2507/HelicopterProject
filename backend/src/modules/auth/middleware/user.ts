import { config } from "../../../configuration/index.js";
import jwt from "jsonwebtoken";

export function authMiddlewareUser(req: any, res: any, next: any) {
  try {
    const token = req.headers.authorization;

    if (!token) throw new Error("Пожалуйста, авторизируйтесь для доступа к услугам!");

    const decodedData = jwt.verify(token, config.secret_access);
    req.user = decodedData;

    console.log(req.user.id);

    next();
  } catch (error: any) {
    if (error.message === "jwt expired") {
      res.status(401).json({ message: "Пожалуйста, авторизируйтесь для доступа к услугам!" });
    }
    res.status(401).json({ message: error.message });
  }
}
