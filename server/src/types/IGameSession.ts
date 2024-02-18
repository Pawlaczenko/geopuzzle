import { TTrack } from "../models/trackModel.js"
import { TWaypoint } from "../models/waypointsModel.js"

export default interface GameSession {
    stageStart: null | Date,
    details: TTrack | null,
    isStarted: boolean,
    currentStage: number,
    gameScore: {
      score: Array<number>,
      timeMs: Array<number>
    }
}
// export interface GameResponse {
//   waypoint: TWaypoint,
//   score: string,
// }