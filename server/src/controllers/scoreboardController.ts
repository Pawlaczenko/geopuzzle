import scoreboardModel from "../models/scoreboardModel.js"
import * as factoryHandler from  "../utils/factoryHandler.js"

export const getAllScoreboardEntries = factoryHandler.getAll(scoreboardModel);
export const deleteOneScoreboardEntry = factoryHandler.getAll(scoreboardModel);