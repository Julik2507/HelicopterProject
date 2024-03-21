import express from "express";
import { authMiddlewareUser } from "../auth/middleware/user.js";
import { deleteUserData, updateUserData } from "./users.service.js";
import { parse } from "valibot";
import { changeUserSchema } from "./dto/index.js";

const router = express.Router();

router.patch("/change", authMiddlewareUser, async (req: any, res) => {
  try {
    const validateData = parse(changeUserSchema, req.body);
    const user = req.user;
    const result = await updateUserData(user.id, req.body);
    res.send(result);
  } catch (error: any) {
    res.send({ message: error.message });
  }
});

router.delete("/delete", authMiddlewareUser, async (req: any, res) => {
  const user = req.user;
  const result = await deleteUserData(user.id);
  res.send(result);
});

export default router;
