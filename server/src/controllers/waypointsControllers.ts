import WaypointModel from "../models/waypointsModel.js";
import * as factoryHadler from "./factoryHandler.js";

export const getOneWaypoint = factoryHadler.getOne(WaypointModel);
export const addOneWaypoint = factoryHadler.addOne(WaypointModel);
export const deleteOneWaypoint = factoryHadler.deleteOne(WaypointModel);
export const updateOneWaypoint = factoryHadler.updateOne(WaypointModel);