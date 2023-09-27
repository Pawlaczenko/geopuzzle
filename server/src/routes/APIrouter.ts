import express from 'express';
import trackRouter from './trackRouter.js';
const APIrouter = express.Router();

//track routing
APIrouter.use("/track", trackRouter)


export default APIrouter