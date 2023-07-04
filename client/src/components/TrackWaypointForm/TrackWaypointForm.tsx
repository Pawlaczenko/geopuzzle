import { Formik } from 'formik';
import { FC, useState, useRef, useEffect } from 'react';
import TextInput from 'src/components/Input/TextInput';
import { StyledForm } from '../TrackInfoForm/TrackInfoForm';
import Map from '../Map/Map';
import CoordinatesInput from '../Input/CoordinatesInput';
import { coordSuggestion } from 'src/types/input.types';
import AddPuzzleLabel from '../AddPuzzleLabel';
import { useLocationSearch } from 'src/hooks/useLocationSearch';
import Button from '../Button/Button.styled';
import { IPuzzle, puzzleID } from 'src/types/puzzle.types';
import { TrackWaypoint, useCreateTrackContext } from 'src/context/CreateTrackContext';
import TextArea from '../Input/TextArea';
import { styled } from 'styled-components';
import { flexContainer } from 'src/styles/mixins';

const FormNames = {
    point_name: "pointName",
    point_direction: "pointDirection",
    point_puzzle_type: "puzzleType",
    puzzle_content: "puzzleContent",
    puzzle_explanation: "puzzleExplanation",
    point_radius: "pointRadius"
}

export interface WaypointFormValues {
    pointName: string;
    pointDirection: string;
    puzzleType: puzzleID;
    puzzleContent?: unknown;
    puzzleExplanation?: string;
    pointRadius?: number;
}

const TrackWaypointForm : FC<{currentPoint: number, handleIndexChange: (index:number)=>void}> = ({currentPoint,handleIndexChange}) => {
    const formRef = useRef(null);
    const {formData, setFormData} = useCreateTrackContext();
    const doesPointExist = typeof formData.trackWaypoints[currentPoint] !== 'undefined';
    const initialPoint: WaypointFormValues = {
        pointName: doesPointExist ? formData.trackWaypoints[currentPoint].pointName : '',
        pointDirection: doesPointExist ? formData.trackWaypoints[currentPoint].puzzleCoords.label : '',
        puzzleType: doesPointExist ? formData.trackWaypoints[currentPoint].puzzleType : 'text',
        puzzleContent: doesPointExist ? formData.trackWaypoints[currentPoint].puzzleContent : '',
        puzzleExplanation: doesPointExist ? formData.trackWaypoints[currentPoint].puzzleExplanation : '',
        pointRadius: doesPointExist ? formData.trackWaypoints[currentPoint].pointRadius : 10,
    }
    const [mapWaypoint, setMapWaypoint] = useState<coordSuggestion | undefined>(doesPointExist ? formData.trackWaypoints[currentPoint].puzzleCoords : undefined);
    const {suggestions, handleLocationSearch} = useLocationSearch();

    const handleWaypointChange = (waypoint: coordSuggestion) => {
        setMapWaypoint(waypoint);
    }

    return (
        <Formik
            initialValues={initialPoint}
            onSubmit={(values,{resetForm}) => {
                console.log(values);
                if(mapWaypoint && values.puzzleContent) {
                    const waypoint : TrackWaypoint = {
                        pointName: values.pointName,
                        puzzleType: values.puzzleType,
                        puzzleCoords: mapWaypoint,
                        puzzleContent: values.puzzleContent
                    }
                    const waypointsArray = [...formData.trackWaypoints];
                    if(doesPointExist){
                        waypointsArray.push(waypoint);
                    } else {
                        waypointsArray[currentPoint] = waypoint;
                    }
                    setFormData({
                        ...formData,
                        trackWaypoints: waypointsArray
                    });
                    handleIndexChange(currentPoint+1);
                    resetForm();
                    setMapWaypoint(undefined);
                }
            }}
        >
            {
                formik => (
                    <StyledForm method="POST" onSubmit={formik.handleSubmit} ref={formRef}>
                        <TextInput name={FormNames.point_name} label="Nazwa Punktu" placeholder='Podaj Nazwę Punktu'/>
                        <FormGroup>
                            <CoordinatesInput
                                name={FormNames.point_direction} 
                                label="Odpowiedź" 
                                placeholder='Wybierz Punkt do zgadnięcia' 
                                handleChange={handleLocationSearch}
                                chosenWaypoint={mapWaypoint}
                                handleWaypointChange={handleWaypointChange}
                                suggestions={suggestions}/>
                            <TextInput label={"Promień tolerancji"} name={FormNames.point_radius} type='number' />
                        </FormGroup>
                        <Map chosenMarkerCoords={mapWaypoint?.coords} handleWaypointChange={handleWaypointChange} />
                        <AddPuzzleLabel name={FormNames.point_puzzle_type} />
                        <TextArea label={'Objaśnienie Zagadki'} name={FormNames.puzzle_explanation} placeholder='Wpisz objaśnienie zagadki' />
                        <Button $btnType='yellow' type='submit'>Add Point</Button>
                    </StyledForm>
                )
            }
        </Formik>
    )
}

const FormGroup = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 1.5rem;
    width: 100%;
`

export default TrackWaypointForm