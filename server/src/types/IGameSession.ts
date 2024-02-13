// import { TTrack } from "../../models/trackModel.js"

export default interface GameSession {
    startedAt: null | Date,
    // data: TTrack,
    index: number,
    gameScore: {
      score: [number] | [],
      timeMs?: number
    },
    checkWaypointsCoords: (alt: number, long: number)=> false | number
}