import { FC } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { styled } from 'styled-components'
import { LatLngExpression } from 'leaflet'
import LocationMarker from './LocationMarker'
import { coordSuggestion } from 'src/types/input.types'

export interface IMapProps {
    chosenMarkerCoords?: LatLngExpression;
    handleWaypointChange: (waypoint: coordSuggestion)=>void;
}

const Map : FC<IMapProps> = ({chosenMarkerCoords,handleWaypointChange}) => {
    const defaultPosition : LatLngExpression  = [35.081407, -106.650957];

    return (
        <StyledMap center={chosenMarkerCoords ?? defaultPosition} zoom={10} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker chosenMarkerCoords={chosenMarkerCoords} handleWaypointChange={handleWaypointChange} />
        </StyledMap>
    )
}

const StyledMap = styled(MapContainer)`
    height: 40rem;
    width: 100%;
`

export default Map;