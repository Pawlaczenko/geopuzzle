import { FC, useEffect, useState } from 'react';
import ButtonIcon from 'src/components/Button/ButtonIcon';
import Heading, { StyledHeading } from 'src/components/Heading';
import InfoBox from 'src/components/InfoBox';
import PointList, { StyledPointList } from 'src/components/PointsList/PointList';
import TrackWaypointForm from 'src/components/TrackWaypointForm/TrackWaypointForm';
import { useCreateTrackContext } from 'src/context/CreateTrackContext';
import Section from 'src/layout/Section.styled';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const CreateTrackPoint : FC = () => {
    const {formData,activeStepIndex,setActiveStepIndex,currentPoint, setCurrentPoint} = useCreateTrackContext();
    
    const handleIndexChange = (index:number) => {
        setCurrentPoint(index);
    }

    useEffect(()=>{
        setCurrentPoint(formData.trackWaypoints.length);
    },[formData.trackWaypoints])

    return (
        <StyledCreateTrackPoint>
            <Heading level='h3' withAccent $alignCenter>Dodaj Punkt #{Math.min(currentPoint+1,10)}</Heading>
            {
                formData.trackWaypoints.length < 10
                ? <TrackWaypointForm currentPoint={currentPoint} handleIndexChange={handleIndexChange} />
                : <InfoBox symbol='!'>Osiągnięto maksymalną liczbę punktów w trasie: 10</InfoBox>
            }
            <PointList pointsArray={formData.trackWaypoints} />
            {
                formData.trackWaypoints.length > 1 && <ButtonIcon btnType='blue' icon='puzzle' onClick={()=>{setActiveStepIndex(activeStepIndex+1)}}>Zakończ dodawanie punktów</ButtonIcon>
            }
        </StyledCreateTrackPoint>
    )
}

const StyledCreateTrackPoint = styled(Section)`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-template-areas: "heading heading" "form points" "button points";
    gap: 2rem 5rem;
    align-items: start;

    & > ${StyledHeading} {
        grid-area: heading;
        margin-bottom: 5rem;
    }

    & > ${StyledPointList} {
        grid-area: points;
    }

    & > button {
        grid-area: button;
        justify-self: center;
    }

    @media only screen and (${BREAKPOINTS.big}){
        grid-template-areas: "heading" "points" "form" "button";
        grid-template-columns: 1fr;
    }
`;

export default CreateTrackPoint