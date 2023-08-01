import { FC, useEffect } from "react"
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { IMapProps } from "./Map";
import { coordSuggestion } from "src/types/input.types";
import flagImage from 'src/assets/logo/logo-compact.svg';
import flagShadow from 'src/assets/logo/flag-shadow.svg';
import L, { LatLngExpression } from "leaflet";

const flagIcon = L.icon({
    iconUrl: flagImage,
    shadowUrl: flagShadow,
    iconSize: [50,50],
    iconAnchor: [0, 50],
    shadowAnchor: [12, 8]
})

interface IMarkerProps {
    chosenMarkerCoords?: LatLngExpression;
    handleWaypointChange: (waypoint: coordSuggestion)=>void;
}

const LocationMarker : FC<IMarkerProps> = ({chosenMarkerCoords,handleWaypointChange}) => {
    const map = useMap();
    
    useEffect(()=>{
        if(chosenMarkerCoords) {
            map.flyTo(chosenMarkerCoords,map.getZoom(),{easeLinearity: 1});
        }
    },[chosenMarkerCoords]);

    const mapEvent = useMapEvents({
        click(e) {
            const coords : coordSuggestion = {
                coords:  e.latlng,
                label: e.latlng.toString()
            }
            handleWaypointChange(coords);
        },
    })

    return chosenMarkerCoords === undefined ? null : (
        <Marker position={chosenMarkerCoords} icon={flagIcon} >
        </Marker>
    )
}

export default LocationMarker;