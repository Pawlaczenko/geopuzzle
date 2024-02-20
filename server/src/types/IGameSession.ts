import mongoose, { ObjectId } from "mongoose"
import { TTrack } from "../models/trackModel.js"
export default interface GameSession {
    stageStart: null | Date,
    details: {
      id: ObjectId,
      data: TTrack,
    } | null,
    isStarted: boolean,
    currentStage: number,
    gameScore: {
      score: Array<number>,
      timeMs: Array<number>
    }
}
