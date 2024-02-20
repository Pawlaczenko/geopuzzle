import { Formik } from 'formik';
import { FC, useState, useEffect, useCallback } from 'react';
import TextInput from 'src/components/Input/TextInput';
import CoordinatesInput from '../Input/CoordinatesInput';
import { coordSuggestion } from 'src/types/input.types';
import AddPuzzleLabel from '../AddPuzzleLabel';
import { useLocationSearch } from 'src/hooks/useLocationSearch';
import { puzzleID } from 'src/types/puzzle.types';
import { TrackWaypoint, useCreateTrackContext } from 'src/context/CreateTrackContext';
import TextArea from '../Input/TextArea';
import { styled } from 'styled-components';
import { getTrackWaypointValidationSchema } from './TrackWaypointForm.helper';
import { BREAKPOINTS } from 'src/styles/variables';
import ButtonIcon from '../Button/ButtonIcon';
import StyledForm from '../Form.styled';
import FormMap from '../Map/FormMap';
import { StyledMap } from '../Map/Map';
import LoaderSpinner from '../LoaderSpinner';
import { addOneWaypoint } from 'src/services/WaypointService';

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
    puzzleContent: unknown;
    puzzleExplanation?: string;
    pointRadius: number;
}

const TrackWaypointForm : FC<{currentPoint: number}> = ({currentPoint}) => {
    const {formData, setFormData, trackId} = useCreateTrackContext();
    const doesPointExist = typeof formData.trackWaypoints[currentPoint] !== 'undefined';
    const initialPoint: WaypointFormValues = {
        pointName: doesPointExist ? formData.trackWaypoints[currentPoint].pointName : '',
        pointDirection: doesPointExist ? formData.trackWaypoints[currentPoint].puzzleCoords.label : '',
        puzzleType: doesPointExist ? formData.trackWaypoints[currentPoint].puzzleType : 'text',
        puzzleContent: doesPointExist ? formData.trackWaypoints[currentPoint].puzzleContent : '',
        puzzleExplanation: doesPointExist ? formData.trackWaypoints[currentPoint].puzzleExplanation : '',
        pointRadius: doesPointExist ? formData.trackWaypoints[currentPoint].pointRadius : 10,
    }
    const [mapWaypoint, setMapWaypoint] = useState<coordSuggestion | undefined>(undefined);
    const {suggestions, handleLocationSearch,resetSuggestions} = useLocationSearch();
    const [puzzleType, setPuzzleType] = useState<puzzleID>(initialPoint.puzzleType);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleWaypointChange = (waypoint: coordSuggestion) => {
        setMapWaypoint(waypoint);
    }

    useEffect(()=>{
        resetSuggestions();
        if(doesPointExist){
            setMapWaypoint(formData.trackWaypoints[currentPoint].puzzleCoords);
            setPuzzleType(formData.trackWaypoints[currentPoint].puzzleType);
        }
    },[currentPoint])

    async function handleSubmit(values: WaypointFormValues, resetForm: ()=>void) {
        const waypoint : TrackWaypoint = {
            pointName: values.pointName,
            puzzleType: values.puzzleType,
            puzzleCoords: mapWaypoint!,
            puzzleContent: values.puzzleContent,
            pointRadius: values.pointRadius,
            puzzleExplanation: values.puzzleExplanation
        }
        setIsLoading(true);
        try {
            setError("");
            const point_id = await addOneWaypoint(waypoint,trackId);
            waypoint.id = point_id;
            const waypointsArray = [...formData.trackWaypoints];
            if(doesPointExist){
                waypointsArray[currentPoint] = waypoint;
            } else {
                waypointsArray.push(waypoint);
            }
            setFormData({
                ...formData,
                trackWaypoints: waypointsArray
            });

            resetForm();
            setMapWaypoint(undefined);
            setPuzzleType('text');

            setIsLoading(false);
        } catch(error : any) {
            setError(error.message as string);
            setIsLoading(false);
        }
    }

    return (
        <>
        {isLoading && <LoaderSpinner />}
        <Formik
            initialValues={initialPoint}
            validationSchema={useCallback(()=>getTrackWaypointValidationSchema(puzzleType,mapWaypoint),[puzzleType,mapWaypoint])}
            enableReinitialize={true}
            onSubmit={(values,{resetForm}) => handleSubmit(values,resetForm)}
        >
            {
                formik => (
                    <StyledForm method="POST" onSubmit={formik.handleSubmit} key={`PointForm-${currentPoint}`}>
                        <TextInput name={FormNames.point_name} label="Nazwa Punktu" placeholder='Podaj Nazwę Punktu' helpMessage='Wpisz nazwę miejsca, na które wskazuje zagadka.'/>
                        <FormGroup>
                            <CoordinatesInput
                                name={FormNames.point_direction} 
                                label="Odpowiedź" 
                                placeholder='Wybierz Punkt do zgadnięcia' 
                                handleChange={handleLocationSearch}
                                chosenWaypoint={mapWaypoint}
                                handleWaypointChange={handleWaypointChange}
                                suggestions={suggestions}/>
                            <TextInput label={"Promień tolerancji"} name={FormNames.point_radius} type='number' helpMessage='Obszar poprawnej odpowiedzi (w metrach)' />
                            <FormMap chosenMarkerCoords={mapWaypoint?.coords} handleWaypointChange={handleWaypointChange} />
                        </FormGroup>
                        <AddPuzzleLabel name={FormNames.point_puzzle_type} hadnelPuzzleTypeChange={setPuzzleType} />
                        <TextArea label={'Objaśnienie Zagadki'} name={FormNames.puzzle_explanation} placeholder='Wpisz objaśnienie zagadki' helpMessage='Zostanie wyświetlone graczowi po próbie odgadnięcia zagadki.' />
                        <ButtonIcon type='submit' icon='create' btnType={'outline'}>Zapisz Punkt</ButtonIcon>
                        {
                            error && <p>{error}</p>
                        }
                    </StyledForm>
                )
            }
        </Formik>
        </>
    )
}

const FormGroup = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 1.5rem;
    width: 100%;
    border: var(--border-thin);
    padding: 2rem 1rem;
    border-radius: 1.5rem;

    @media only screen and (${BREAKPOINTS.big}){
        padding: 2rem 0;
        border: none;
    }

    @media only screen and (${BREAKPOINTS.phone}){
        grid-template-columns: 1fr;
    }

    & > ${StyledMap} {
        grid-column: 1/-1;
    }
`

export default TrackWaypointForm