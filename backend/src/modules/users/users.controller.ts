import express from "express";
import { authMiddlewareUser } from "../auth/middleware/user.js";
import { deleteUserData, updateUserData } from "./users.service.js";
import * as v from "valibot";
import { changeUserSchema } from "./dto/index.js";

const router = express.Router();

router.patch("/change", authMiddlewareUser, async (req: any, res) => {
  const validateData = v.parse(changeUserSchema, req.body);
  const user = req.user;
  const result = await updateUserData(user.id, req.body);
  res.send(result);
});

router.delete("/delete", authMiddlewareUser, async (req: any, res) => {
  const user = req.user;
  const result = await deleteUserData(user.id);
  res.send(result);
});

export default router;
