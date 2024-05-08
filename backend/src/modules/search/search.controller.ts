import express from "express";
import { getCommonThings } from "./search.service.js";

const router = express.Router();

router.get("/catalogue/search", async (req: any, res) => {
  try {
    const result = await getCommonThings(req.query);
    res.send(result);
    console.log(req.query);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
