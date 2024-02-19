import { FC, useRef, useState } from 'react'
import { StyledBanner } from 'src/components/Banner';
import Page from 'src/layout/Page.styled';
import BackgroundImage from 'src/assets/dev/7cDoyzS.jpg'
import TrackInfoBox from 'src/components/TrackInfoBox';
import { styled } from 'styled-components';
import { flexContainer } from 'src/styles/mixins';
import TrackPointNavigation, { StyledTrackPointNavigation } from 'src/components/TrackPointNavigation';
import StopWatch from 'src/components/StopWatch';
import useTimer from 'src/hooks/useTimer';
import ButtonIcon from 'src/components/Button/ButtonIcon';
import GameMap from 'src/components/Map/GameMap';
import { coordSuggestion } from 'src/types/input.types';
import PuzzleWrapper from 'src/components/Puzzles/PuzzleWrapper';
import { IPuzzleContent } from 'src/types/puzzle.types';
import Container from 'src/layout/Container';
import TrackItem, { ITrackItemProps } from 'src/components/TrackItem/TrackItem';
import TrackSwiper from 'src/components/TrackSwiper';
import { BREAKPOINTS } from 'src/styles/variables';

const ViewTrack : FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const time = useTimer(isRunning);
    const [btnDisabled, setButtonDisabled] = useState(true);
    const [currentPuzzle, setCurrentPuzzle] = useState(0);
    const points = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    const interactiveBarRef = useRef<HTMLDivElement>(null);

    const [mapWaypoint, setMapWaypoint] = useState<coordSuggestion | undefined>(undefined);
    const handleWaypointChange = (waypoint: coordSuggestion) => {
        console.log(waypoint);
        setMapWaypoint(waypoint);
        setButtonDisabled(false);
    }

    const startTrack = () => {
        setIsRunning(true);

        // Scroll into view when starting the track
        if (interactiveBarRef.current) {
            interactiveBarRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    const textPuzzle : IPuzzleContent = {
        type: 'text',
        content: 'Państwo o tej stolicy zostało zaatakowane przez III Rzeszę 1 września 1939, co zapoczątkowało II Wojnę Światową.'
    }

    const imagePuzzle : IPuzzleContent = {
        type: 'image',
        content: 'https://fajnepodroze.pl/wp-content/uploads/2023/03/luk-triumfalny.jpg'
    }

    return (
        <Page>
            <StyledThumbnail>
                <img src={BackgroundImage} />
            </StyledThumbnail>
            <TrackBanner background={BackgroundImage}>
                <Container>
                    <TrackInfoBox handleStart={startTrack} />
                </Container>
            </TrackBanner>
            <ScrollAnchor ref={interactiveBarRef}></ScrollAnchor>
            {
                isRunning &&             
                <Container>
                    <InteractiveBar>
                        <TrackPointNavigation currentIndex={currentPuzzle} points={points} />
                        <ButtonIcon btnType='regular' icon='check' disabled={btnDisabled}>Sprawdź</ButtonIcon>
                        <StopWatch time={time}/>
                    </InteractiveBar>
                    <PuzzleWrapper puzzle={textPuzzle} />
                    <GameMap chosenMarkerCoords={mapWaypoint?.coords} handleWaypointChange={handleWaypointChange} />
                </Container>
            }
            <Container>
                <TrackSwiper />
            </Container>
        </Page>
    )
}

const ScrollAnchor = styled.div`
    scroll-margin-top: 6.4rem;
`;

const TrackBanner = styled(StyledBanner)`
    display: block;

    @media only screen and (${BREAKPOINTS.phone}){
        padding: 0;
        background: none;
    }
`

const InteractiveBar = styled.div`
    ${flexContainer('space-between','center')};
    padding: 2rem 0;
    gap: 2rem;

    & > ${StyledTrackPointNavigation} {
        flex: 1;
    }

    @media only screen and (${BREAKPOINTS.big}){
        flex-wrap: wrap;
        justify-content: center;
        & > ${StyledTrackPointNavigation} {
            flex-basis: 100%;
            justify-content: center;
            flex-wrap: wrap;
        }
    }

    @media only screen and (${BREAKPOINTS.phone}){
        margin-top: 4.8rem;
    }
`;

const StyledThumbnail = styled.figure`
    aspect-ratio: 16/9;
    margin-bottom: 2.4rem;
    display: none;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media only screen and (${BREAKPOINTS.phone}){
        display: block;
    }
`;

export default ViewTrack