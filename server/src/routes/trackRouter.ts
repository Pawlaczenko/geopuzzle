import { Router } from "express";
import * as trackController from "../controllers/trackControllers.js";
import * as waypointController from "../controllers/waypointController.js";

const trackRouter = Router();

trackRouter.route("/")
    .get(trackController.getAllTrack)
    .post(trackController.addOneTrack);
trackRouter.route("/waypoint/")
    .delete(waypointController.deleteWaypoint)
trackRouter.route("/waypoint/text/:id")
    .post(waypointController.addTextWaypoint);
trackRouter.route("/waypoint/")
    .delete(waypointController.deleteWaypoint)
trackRouter.route("/:id")
    .get( trackController.getOneTrack)
    .patch(trackController.updateOneTrack)
    .delete(trackController.deleteOneTrack);

    
trackRouter.route("/thumbnail/:id")
    .post(trackController.uploadTrackThumbnail, trackController.updateTrackThumbnail)
    .delete(trackController.deleteTrackThumbnail);


    export default trackRouter;
