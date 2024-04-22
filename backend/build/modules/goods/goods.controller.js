import express from "express";
import { createGoods, getGoods, getOneGoods } from "./goods.service.js";
import { uploadImg } from "../images/images.service.js";
import { parse } from "valibot";
import { getGoodsSchema } from "./dto/index.js";
const router = express.Router();
router.post("/create-goods", async (req, res) => {
    try {
        const imgID = await uploadImg(req.files);
        const result = await createGoods(req.body, imgID);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get("/get-goods", async (req, res) => {
    try {
        const validate = parse(getGoodsSchema, req.query);
        const result = await getGoods(req.query);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get("/get-one-goods/:id", async (req, res) => {
    try {
        const result = await getOneGoods(req.params.id);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
export default router;
//# sourceMappingURL=goods.controller.js.map