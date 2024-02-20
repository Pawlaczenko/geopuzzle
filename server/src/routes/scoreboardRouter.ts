import { Router } from "express";
import * as scoreboardController from "../controllers/scoreboardController.js"
const scoreboardRouter = Router();
scoreboardRouter.route("/")
    .get(scoreboardController.getAllScoreboardEntries)
    .delete(scoreboardController.deleteOneScoreboardEntry);
export default scoreboardRouter;