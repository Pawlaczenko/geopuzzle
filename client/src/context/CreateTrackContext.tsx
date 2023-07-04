/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, createContext, useContext } from "react"
import { coordSuggestion } from "src/types/input.types";
import { puzzleID } from "src/types/puzzle.types";

export type TrackWaypoint = {
    pointName: string,
    puzzleType: puzzleID
    puzzleCoords: coordSuggestion,
    pointRadius?: number,
    puzzleContent: unknown,
    puzzleExplanation?: string
}

export type CreateTrackFormData = {
    trackName: string,
    trackDescription: string,
    trackTagNames: string[],
    trackThumbnail?: string | Blob | null,
    trackWaypoints: TrackWaypoint[]
}

export type CreateTrackValues = {
    activeStepIndex: number,
    setActiveStepIndex: Dispatch<SetStateAction<number>>,
    formData: CreateTrackFormData,
    setFormData: Dispatch<SetStateAction<CreateTrackFormData>>,
}

export const CreateTrackContext = createContext<CreateTrackValues>({
    activeStepIndex: 1,
    setActiveStepIndex: ()=>{},
    formData: {
        trackName: "",
        trackDescription: "",
        trackTagNames: [],
        trackWaypoints: []
    },
    setFormData: ()=>{}
});

export const useCreateTrackContext = () => useContext(CreateTrackContext)