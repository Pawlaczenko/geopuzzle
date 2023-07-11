import { FC, useEffect, useState } from 'react';
import ButtonIcon from 'src/components/Button/ButtonIcon';
import Heading, { StyledHeading } from 'src/components/Heading';
import InfoBox, { StyledInfoBox } from 'src/components/InfoBox';
import PointList, { StyledPointList } from 'src/components/PointsList/PointList';
import TrackWaypointForm from 'src/components/TrackWaypointForm/TrackWaypointForm';
import { useCreateTrackContext } from 'src/context/CreateTrackContext';
import Section from 'src/layout/Section.styled';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const CreateTrackPoint : FC = () => {
    const {formData,activeStepIndex,setActiveStepIndex,currentPoint, setCurrentPoint} = useCreateTrackContext();
    const canAdd = currentPoint < 10;

    useEffect(()=>{
        setCurrentPoint(formData.trackWaypoints.length);
    },[formData.trackWaypoints])

    return (
        <StyledCreateTrackPoint $isFull={!canAdd}>
            <Heading level='h3' withAccent $alignCenter>
                {
                    canAdd ? `Punkt #${currentPoint+1}` : "Osiągnięto Limit"
                }
            </Heading>
            {
                canAdd
                ? <TrackWaypointForm currentPoint={currentPoint} />
                : <InfoBox symbol='!'>Osiągnięto maksymalną liczbę punktów w trasie: 10</InfoBox>
            }
            <PointList pointsArray={formData.trackWaypoints} />
            {
                formData.trackWaypoints.length > 1 && <ButtonIcon btnType='blue' icon='puzzle' onClick={()=>{setActiveStepIndex(activeStepIndex+1)}}>Zakończ dodawanie punktów</ButtonIcon>
            }
        </StyledCreateTrackPoint>
    )
}

const StyledCreateTrackPoint = styled(Section)<{$isFull: boolean}>`
    display: grid;
    grid-template-columns: 1.7fr 1fr;
    grid-template-areas: "heading heading" "form points" "button points";
    grid-template-rows: auto ${({$isFull}) => $isFull ? '11rem' : 'auto'} auto;
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
    
    & > ${StyledInfoBox} {
        grid-area: form;
    }

    @media only screen and (${BREAKPOINTS.big}){
        grid-template-areas: "heading" "points" "form" "button";
        grid-template-rows: auto;
        grid-template-columns: 1fr;
    }
`;

export default CreateTrackPoint