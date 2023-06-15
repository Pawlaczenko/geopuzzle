import { LatLngExpression } from "leaflet"

export interface IInputProps {
    placeholder?: string,
    type?: React.HTMLInputTypeAttribute,
    label: string,
    name: string
}

export type coordSuggestion = {
    coords: LatLngExpression,
    label: string
}