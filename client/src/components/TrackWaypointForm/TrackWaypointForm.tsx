import { Formik } from 'formik';
import { FC, useState } from 'react';
import TextInput from 'src/components/Input/TextInput';
import { StyledForm } from '../TrackInfoForm/TrackInfoForm';
import Map from '../Map/Map';
import CoordinatesInput from '../Input/CoordinatesInput';
import { coordSuggestion } from 'src/types/input.types';
import AddPuzzleLabel from '../AddPuzzleLabel';
import { useLocationSearch } from 'src/hooks/useLocationSearch';
import Button from '../Button/Button.styled';
import { IPuzzle, puzzleID } from 'src/types/puzzle.types';

const FormNames = {
    point_name: "pointName",
    point_direction: "pointDirection",
    point_puzzle_type: "puzzleType"
}

export interface WaypointFormValues {
    pointName: string;
    pointDirection: string;
    puzzleType: puzzleID;
}

const TrackWaypointForm : FC = () => {
    const initialValues : WaypointFormValues = {pointName: '', pointDirection: '', puzzleType: 'text'};
    const [mapWaypoint, setMapWaypoint] = useState<coordSuggestion | undefined>(undefined);
    const {suggestions, handleLocationSearch} = useLocationSearch();

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
                        <AddPuzzleLabel name={FormNames.point_puzzle_type} />
                        <Button $btnType='yellow' type='submit'>Add Point</Button>
                    </StyledForm>
                )
            }
        </Formik>
    )
}

export default TrackWaypointForm