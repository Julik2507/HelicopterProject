import express from "express";
import * as v from "valibot";
import { registerUser, loginUser, getAllUsers } from "./auth.service.js";
import { loginSchema, registerSchema } from "./dto/index.js";
import { authMiddlewareUser } from "./middleware/user.js";
const router = express.Router();
router.post("/register", async (req, res) => {
    try {
        const validateRegister = v.parse(registerSchema, req.body);
        const result = await registerUser(req.body);
        res.status(201).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
router.post("/login", async (req, res) => {
    try {
        const validateLogin = v.parse(loginSchema, req.body);
        const result = await loginUser(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});
router.get("/users", authMiddlewareUser, async (req, res) => {
    const result = await getAllUsers();
    res.send(result);
});
export default router;
//# sourceMappingURL=auth.controller.js.map