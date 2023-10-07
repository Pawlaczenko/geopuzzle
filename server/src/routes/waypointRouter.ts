import { Router } from "express";
import * as waypointController from "../controllers/waypointsControllers.js";

const waypointRouter = Router();

waypointRouter.route("/")
    .post( waypointController.addOneWaypoint)
waypointRouter.route("/:id")
    .get(waypointController.getOneWaypoint)
    .patch(waypointController.updateOneWaypoint)
    .delete(waypointController.deleteOneWaypoint)
export default waypointRouter;