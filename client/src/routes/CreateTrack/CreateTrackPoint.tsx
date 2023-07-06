import { FC, useEffect, useState } from 'react';
import Heading, { StyledHeading } from 'src/components/Heading';
import InfoBox from 'src/components/InfoBox';
import PointList from 'src/components/PointsList/PointList';
import TrackWaypointForm from 'src/components/TrackWaypointForm/TrackWaypointForm';
import { useCreateTrackContext } from 'src/context/CreateTrackContext';
import Section from 'src/layout/Section.styled';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const CreateTrackPoint : FC = () => {
    const [currentPoint, setCurrentPoint] = useState<number>(0);
    const {formData} = useCreateTrackContext();
    
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
        </StyledCreateTrackPoint>
    )
}

const StyledCreateTrackPoint = styled(Section)`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-template-areas: "heading heading" "form points" "form points";
    gap: 5rem;
    align-items: start;

    & > ${StyledHeading} {
        grid-area: heading;
        margin-bottom: 5rem;
    }

    @media only screen and (${BREAKPOINTS.big}){
        grid-template-areas: "heading" "points" "form";
        grid-template-columns: 1fr;
    }
`;

export default CreateTrackPoint