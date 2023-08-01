import { FC } from 'react'
import styled from 'styled-components'
import Map from './Map';
import { DEFAULT_MAP_POSITION, ICustomMapProps } from 'src/types/input.types';
import LocationMarker from './LocationMarker';
import { useFormikContext } from 'formik';
import { WaypointFormValues } from '../TrackWaypointForm/TrackWaypointForm';
import { Circle } from 'react-leaflet';

const FormMap : FC<ICustomMapProps> = ({chosenMarkerCoords,handleWaypointChange}) => {
    const radiusCircleTheme = {
        color: '#79AEA3',
        fillColor: '#FFE25F'
    }

    const {values} = useFormikContext<WaypointFormValues>();
    return (
        <Map center={chosenMarkerCoords}>
            <LocationMarker chosenMarkerCoords={chosenMarkerCoords} handleWaypointChange={handleWaypointChange} />
            <Circle center={chosenMarkerCoords || DEFAULT_MAP_POSITION} radius={values.pointRadius} pathOptions={radiusCircleTheme} />
        </Map>
    )
}


export default FormMap