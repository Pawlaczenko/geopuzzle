import { FC, useState } from 'react';
import Heading, { StyledHeading } from 'src/components/Heading';
import TrackWaypointForm from 'src/components/TrackWaypointForm/TrackWaypointForm';
import Section from 'src/layout/Section.styled';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const CreateTrackPoint : FC = () => {
    const [currentPoint, setCurrentPoint] = useState<number>(0);
    
    const handleIndexChange = (index:number) => {
        setCurrentPoint(index);
    }

    return (
        <StyledCreateTrackPoint>
            <Heading level='h3' withAccent $alignCenter>Dodaj Punkt #{currentPoint+1}</Heading>
            <TrackWaypointForm currentPoint={currentPoint} handleIndexChange={handleIndexChange} />
        </StyledCreateTrackPoint>
    )
}

const StyledCreateTrackPoint = styled(Section)`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-template-areas: "heading heading" "form points" "form points";
    gap: 5rem;

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