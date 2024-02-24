import { FC, useEffect } from "react"
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { IMapProps } from "./Map";
import { coordSuggestion } from "src/types/input.types";
import flagImage from 'src/assets/logo/logo-compact.svg';
import flagImageCorrent from 'src/assets/logo/flag-blue.svg';
import flagShadow from 'src/assets/logo/flag-shadow.svg';
import L, { LatLngExpression } from "leaflet";
import { Circle } from 'react-leaflet';

const correctFlagIcon = L.icon({
    iconUrl: flagImageCorrent,
    shadowUrl: flagShadow,
    iconSize: [50,50],
    iconAnchor: [0, 50],
    shadowAnchor: [12, 8]
})

interface IMarkerProps {
    chosenMarkerCoords?: LatLngExpression;
    fitMarkerCoords?: LatLngExpression,
    radius: number,
}

const CorrectMarker : FC<IMarkerProps> = ({chosenMarkerCoords, radius, fitMarkerCoords}) => {
    const map = useMap();

    const radiusCircleTheme = {
        color: '#79AEA3',
        fillColor: '#FFE25F'
    }
    // var group = new L.featureGroup([marker1, marker2, marker3]);

    useEffect(()=>{
        if(chosenMarkerCoords && fitMarkerCoords){
            const bounds = L.latLngBounds(chosenMarkerCoords, fitMarkerCoords);
            map.fitBounds(bounds);
        }
        // var corner1 = L.latLng(40.712, -74.227),
        // corner2 = L.latLng(40.774, -74.125),

        
        // if(chosenMarkerCoords) {
        //     map.flyTo(chosenMarkerCoords,1.5,{easeLinearity: 1});
        // }
        
    },[chosenMarkerCoords]);

    return chosenMarkerCoords === undefined ? null : (
        <>
            <Marker position={chosenMarkerCoords} icon={correctFlagIcon} >
            </Marker>
            <Circle center={chosenMarkerCoords} radius={radius} pathOptions={radiusCircleTheme} />
        </>
    )
}

export default CorrectMarker;