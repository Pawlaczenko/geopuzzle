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
import AddPuzzleLabel from '../AddPuzzleLabel';
import Modal from '../Modal';
import { useLocationSearch } from 'src/hooks/useLocationSearch';

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
    const [mapWaypoint, setMapWaypoint] = useState<coordSuggestion | undefined>(undefined);
    const {suggestions, handleLocationSearch} = useLocationSearch();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
                        <AddPuzzleLabel handleModalClick={()=>{setIsModalOpen(true)}} />
                        <Modal shouldShow={isModalOpen} handleClose={()=>{setIsModalOpen(false)}} title="Dodaj Zagadkę">
                            Hello
                        </Modal>
                    </StyledForm>
                )
            }
        </Formik>
    )
}

export default TrackWaypointForm