import express from "express";
import { createType, getAllTypes } from "./types.service.js";

const router = express.Router();

router.post("/type", async (req, res) => {
  const { name } = req.body;
  const result = await createType({ name });
  res.send(result);
});

router.get("/type", async (req, res) => {
  const result = await getAllTypes();
  res.send(result);
});

export default router;
