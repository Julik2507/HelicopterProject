import jwt from "jsonwebtoken";
import { config } from "../../../configuration/index.js";

export function authMiddlewareAdmin(req: any, res: any, next: any) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("You didnt authorize");

    const decodedData = jwt.verify(token, config.secret);
    req.user = decodedData;
    console.log(req.user.role);

    if (req.user.role === "ADMIN") {
      next();
    } else {
      throw new Error("You dont have permissions");
    }
  } catch (e: any) {
    console.log(e);
    return res.json({ message: e.message }).status(403);
  }
}
