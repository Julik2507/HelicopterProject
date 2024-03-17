import express from "express";
import { createBrand, getAllBrands } from "./brands.service.js";
import * as v from "valibot";
import { brandSchema } from "./dto/index.js";

const router = express.Router();

router.post("/brand", async (req, res) => {
  const validate = v.parse(brandSchema, req.body);
  const result = await createBrand(req.body);
  res.send(result);
});

router.get("/brand", async (req, res) => {
  const result = await getAllBrands();
  res.send(result);
});

export default router;
