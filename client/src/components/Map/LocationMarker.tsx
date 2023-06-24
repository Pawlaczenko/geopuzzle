import { FC, useEffect } from "react"
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { IMapProps } from "./Map";
import { coordSuggestion } from "src/types/input.types";

const LocationMarker : FC<IMapProps> = ({chosenMarkerCoords,handleWaypointChange}) => {
    const map = useMap();
    
    useEffect(()=>{
        if(chosenMarkerCoords) {
            map.flyTo(chosenMarkerCoords,map.getZoom(),{animate: false});
        }
    },[chosenMarkerCoords]);

    const mapEvent = useMapEvents({
        click(e) {
            console.log(e);
            const coords : coordSuggestion = {
                coords:  e.latlng,
                label: e.latlng.toString()
            }
            handleWaypointChange(coords);
        }
    })

    return chosenMarkerCoords === undefined ? null : (
        <Marker position={chosenMarkerCoords}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default LocationMarker;