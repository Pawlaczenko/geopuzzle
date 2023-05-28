import express, { Router } from 'express';
import * as trackController from './../controllers/trackController.js'

const APIrouter:Router = express.Router();

//track routing

APIrouter.route(["/track", "/track/all"])
.get(trackController.getAllTracks)
APIrouter.route('/track')
.post(trackController.addOneTrack)
APIrouter.route('/track/:id')
.get(trackController.getOneTrack)
.patch(trackController.updateOneTrack)
.delete(trackController.deleteOneTrack)

export default APIrouter