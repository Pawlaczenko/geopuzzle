import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";

const MapSearch : FC<{provider: OpenStreetMapProvider}> = ({provider}) => {
    const map = useMap() // access to leaflet map

    useEffect(()=>{
        const searchControl = GeoSearchControl({provider: provider, style: 'button'});
        map.addControl(searchControl);

        return () => {map.removeControl(searchControl)};
    },[provider]);

    return null // don't want anything to show up from this comp
}

export default MapSearch;