import express from "express";
import { getCommonThings } from "./search.service.js";

const router = express.Router();

router.get("/catalogue/search", async (req: any, res) => {
  try {
    const result = await getCommonThings(req.query.letters);

    res.send(result);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
