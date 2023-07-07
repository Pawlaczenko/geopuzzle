import { Formik } from 'formik';
import { FC, useState } from 'react';
import TextInput from 'src/components/Input/TextInput';
import Map from '../Map/Map';
import CoordinatesInput from '../Input/CoordinatesInput';
import { coordSuggestion } from 'src/types/input.types';
import AddPuzzleLabel from '../AddPuzzleLabel';
import { useLocationSearch } from 'src/hooks/useLocationSearch';
import Button from '../Button/Button.styled';
import { puzzleID } from 'src/types/puzzle.types';
import { TrackWaypoint, useCreateTrackContext } from 'src/context/CreateTrackContext';
import TextArea from '../Input/TextArea';
import { styled } from 'styled-components';
import { getTrackWaypointValidationSchema } from './TrackWaypointForm.helper';
import { BREAKPOINTS } from 'src/styles/variables';
import ButtonIcon from '../Button/ButtonIcon';
import StyledForm from '../Form.styled';

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
    const [puzzleType, setPuzzleType] = useState<puzzleID>(initialPoint.puzzleType);

    const handleWaypointChange = (waypoint: coordSuggestion) => {
        setMapWaypoint(waypoint);
    }

    return (
        <Formik
            initialValues={initialPoint}
            validationSchema={getTrackWaypointValidationSchema(puzzleType,mapWaypoint)}
            onSubmit={(values,{resetForm}) => {
                const waypoint : TrackWaypoint = {
                    pointName: values.pointName,
                    puzzleType: values.puzzleType,
                    puzzleCoords: mapWaypoint!,
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
                resetForm();
                setMapWaypoint(undefined);
                setPuzzleType('text');
            }
            }
        >
            {
                formik => (
                    <StyledForm method="POST" onSubmit={formik.handleSubmit}>
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
                        <AddPuzzleLabel name={FormNames.point_puzzle_type} hadnelPuzzleTypeChange={setPuzzleType} />
                        <TextArea label={'Objaśnienie Zagadki'} name={FormNames.puzzle_explanation} placeholder='Wpisz objaśnienie zagadki' />
                        <ButtonIcon btnType='yellow' type='submit' icon='create'>Add Point</ButtonIcon>
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

    @media only screen and (${BREAKPOINTS.phone}){
        grid-template-columns: 1fr;
    }
`

export default TrackWaypointForm