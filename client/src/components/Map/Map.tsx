import { FC } from 'react'
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { styled } from 'styled-components'
import { LatLngExpression } from 'leaflet'
import LocationMarker from './LocationMarker'
import { coordSuggestion } from 'src/types/input.types'
import { useFormikContext } from 'formik'
import { WaypointFormValues } from '../TrackWaypointForm/TrackWaypointForm'

export interface IMapProps {
    chosenMarkerCoords?: LatLngExpression;
    handleWaypointChange: (waypoint: coordSuggestion)=>void;
}

const Map : FC<IMapProps> = ({chosenMarkerCoords,handleWaypointChange}) => {
    const defaultPosition : LatLngExpression  = [49.016257, -22.851563];
    const radiusCircleTheme = {
        color: '#79AEA3',
        fillColor: '#FFE25F'
    } 
    const {values} = useFormikContext<WaypointFormValues>();

    return (
        <StyledMap center={chosenMarkerCoords ?? defaultPosition} zoom={1} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker chosenMarkerCoords={chosenMarkerCoords} handleWaypointChange={handleWaypointChange} />
            <Circle center={chosenMarkerCoords || defaultPosition} radius={values.pointRadius} pathOptions={radiusCircleTheme} />
        </StyledMap>
    )
}

const StyledMap = styled(MapContainer)`
    height: 40rem;
    width: 100%;
`

export default Map;