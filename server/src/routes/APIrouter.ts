import express from 'express';
import trackRouter from './trackRouter.js';
import waypointRouter from './waypointRouter.js';
const APIrouter = express.Router();

//track routing
APIrouter.use("/track", trackRouter);
APIrouter.use("/waypoint", waypointRouter);


export default APIrouter