import express from "express";
import * as v from "valibot";
import { registerUser, loginUser, logoutUser } from "./auth.service.js";
import { loginSchema, registerSchema } from "./dto/index.js";
import { updateTokens } from "./token/token.service.js";
const router = express.Router();
router.post("/auth/register", async (req, res) => {
    try {
        const validateRegister = v.parse(registerSchema, req.body);
        const result = await registerUser(req.body);
        res.cookie("refreshToken", result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.status(201).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
router.post("/auth/login", async (req, res) => {
    try {
        const validateLogin = v.parse(loginSchema, req.body);
        const result = await loginUser(req.body);
        res.cookie("refreshToken", result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
});
router.post("/auth/logout", async (req, res) => {
    const refreshToken = req.cookies;
    const deleteToken = await logoutUser(refreshToken);
    res.clearCookie("refreshToken");
    res.send("Токен успешно удален xD");
});
router.post("", async (req, res) => {
    const refreshToken = req.cookies("refreshToken");
    const result = await updateTokens(refreshToken);
    res.cookie("refreshToken", result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return result;
});
export default router;
//# sourceMappingURL=auth.controller.js.map