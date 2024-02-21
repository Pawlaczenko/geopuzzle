import { Router } from "express";
import * as scoreboardController from "../controllers/scoreboardController.js"
const scoreboardRouter = Router();
scoreboardRouter.route("/")
    .get(scoreboardController.getAllScoreboardEntries)
export default scoreboardRouter;