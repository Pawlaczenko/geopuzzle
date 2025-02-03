import { Router } from "express";
import * as scoreboardController from "../controllers/scoreboardController.js"
import { protectedRoute } from "../controllers/authController.js";
const scoreboardRouter = Router();
scoreboardRouter.route("/")
    .get(scoreboardController.getAllScoreboardEntries)
scoreboardRouter.route("/:id")
    .delete(protectedRoute, scoreboardController.truncateScroreboard)
export default scoreboardRouter;