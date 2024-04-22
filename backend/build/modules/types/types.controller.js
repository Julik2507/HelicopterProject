import express from "express";
import { createType, getAllTypes } from "./types.service.js";
import { parse } from "valibot";
import { typeSchema } from "./dto/index.js";
const router = express.Router();
router.post("/type", async (req, res) => {
    try {
        const validate = parse(typeSchema, req.body);
        const result = await createType(req.body);
        res.send(result);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
router.get("/type", async (req, res) => {
    try {
        const result = await getAllTypes();
        res.send(result);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
export default router;
//# sourceMappingURL=types.controller.js.map