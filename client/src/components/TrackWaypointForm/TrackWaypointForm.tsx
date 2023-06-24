import { Formik } from 'formik';
import { FC, useCallback, useEffect, useState } from 'react';
import TextInput from 'src/components/Input/TextInput';
import { StyledForm } from '../TrackInfoForm/TrackInfoForm';
import Map from '../Map/Map';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider.js';
import { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider.js';
import CoordinatesInput from '../Input/CoordinatesInput';
import { coordSuggestion } from 'src/types/input.types';
import debounce from 'lodash/debounce';

const FormNames = {
    point_name: "pointName",
    point_direction: "pointDirection",
}

export interface WaypointFormValues {
    pointName: string;
    pointDirection: string;
}

const TrackWaypointForm : FC = () => {
    const initialValues : WaypointFormValues = {pointName: '', pointDirection: ''};
    const searchProvider = new OpenStreetMapProvider({
        params: {
            limit: 5
        }
    });
    const [mapWaypoint, setMapWaypoint] = useState<coordSuggestion | undefined>(undefined);
    const [suggestions, setSuggestions] = useState<coordSuggestion[] | undefined>(undefined);

    const handleLocationSearch = useCallback(debounce(async (query: string) => {
        const results : SearchResult<RawResult>[] = await searchProvider.search({query: query});
        const suggestions : coordSuggestion[] = results.map(item => {
            return {
                label: item.label,
                coords: [item.y, item.x]
            }
        });
        setSuggestions(suggestions);
    }, 300),[]);

    useEffect(() => {
        return () => {
          handleLocationSearch.cancel();
        };
      }, []);

    const handleWaypointChange = (waypoint: coordSuggestion) => {
        setMapWaypoint(waypoint);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values,{setSubmitting}) => {
                console.log(values);
            }}
        >
            {
                formik => (
                    <StyledForm method="POST" onSubmit={formik.handleSubmit}>
                        <TextInput name={FormNames.point_name} label="Nazwa Punktu" placeholder='Podaj Nazwę Punktu'/>
                        <CoordinatesInput
                            name={FormNames.point_direction} 
                            label="Odpowiedź" 
                            placeholder='Wybierz Punkt do zgadnięcia' 
                            handleChange={handleLocationSearch}
                            chosenWaypoint={mapWaypoint}
                            handleWaypointChange={handleWaypointChange}
                            suggestions={suggestions}/>
                        <Map chosenMarkerCoords={mapWaypoint?.coords} handleWaypointChange = {handleWaypointChange} />
                    </StyledForm>
                )
            }
        </Formik>
    )
}

export default TrackWaypointForm