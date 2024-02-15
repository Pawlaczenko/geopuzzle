import { Router } from "express";
import * as tagController from "../controllers/tagController.js";

const tagRouter = Router();
tagRouter.route("/")
    .get(tagController.getAllTags)
    .post(tagController.addTag);
export default tagRouter;