import { NextFunction, Request, Response, Router } from "express";
import * as trackController from "../controllers/trackControllers.js";
import * as waypointController from "../controllers/waypointController.js";
import { protectedRoute, convertUserToBody} from "../controllers/authController.js";

const trackRouter = Router();

trackRouter.route("/")
    .get(trackController.getAllTrack)
    .post(protectedRoute, convertUserToBody, trackController.addOneTrack);
trackRouter.route("/waypoint/")
    .delete(protectedRoute,waypointController.deleteWaypoint)
trackRouter.route("/waypoint/text/:id")
    .post(protectedRoute,waypointController.addTextWaypoint);
trackRouter.route("/waypoint/graphic/:id")
    .post(protectedRoute, waypointController.uploadPictureForWaypoint ,waypointController.addGraphicWaypoint);

trackRouter.route("/:id")
    .get( trackController.getOneTrack)
    .patch(protectedRoute, trackController.updateOneTrack)
    .delete(protectedRoute, trackController.deleteOneTrack);
    
trackRouter.route("/thumbnail/:id")
    .post(protectedRoute, trackController.uploadTrackThumbnail, trackController.updateTrackThumbnail)
    .delete(protectedRoute,trackController.deleteTrackThumbnail);


    export default trackRouter;
