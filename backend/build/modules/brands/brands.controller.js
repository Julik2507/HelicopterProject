import express from "express";
import { createBrand, getAllBrands } from "./brands.service.js";
import * as v from "valibot";
import { brandSchema } from "./dto/index.js";
const router = express.Router();
router.post("/brand", async (req, res) => {
    try {
        const validate = v.parse(brandSchema, req.body);
        const result = await createBrand(req.body);
        res.send(result);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
router.get("/brand", async (req, res) => {
    try {
        const result = await getAllBrands();
        res.send(result);
    }
    catch (error) {
        res.send({ message: error.message });
    }
});
export default router;
//# sourceMappingURL=brands.controller.js.map