import { Router } from "express";
import * as trackController from "../controllers/trackControllers.js";

const trackRouter = Router();

trackRouter.route("/")
    .get(trackController.getAllTrack)
    .post(trackController.addOneTrack);
trackRouter.route("/:id")
    .get( trackController.getOneTrack)
    .patch(trackController.updateOneTrack)
    .delete(trackController.deleteOneTrack)
trackRouter.route("/waypoint/:id")
    .post(trackController.addWaypointToTrack)
    .delete(trackController.deleteWaypointFromTrack);
trackRouter.route("/thumbnail/:id")
    .post(trackController.uploadTrackThumbnail, trackController.updateTrackThumbnail)
    .delete(trackController.deleteTrackThumbnail)
export default trackRouter;