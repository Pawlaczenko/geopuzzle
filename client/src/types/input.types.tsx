import { LatLngExpression } from "leaflet"
import { ICorrectAnswerMarker } from "src/routes/DisplayTrack/ViewTrack";

export interface IInputProps {
    placeholder?: string,
    type?: React.HTMLInputTypeAttribute,
    label?: string,
    name: string,
    helpMessage?: string
}

export type coordSuggestion = {
    coords: LatLngExpression,
    label: string
}

export interface ICustomMapProps {
    chosenMarkerCoords?: LatLngExpression;
    correctMarkerCoords?: ICorrectAnswerMarker | null;
    handleWaypointChange: (waypoint: coordSuggestion)=>void;
}

export const DEFAULT_MAP_POSITION : LatLngExpression  = [49.016257, -22.851563];