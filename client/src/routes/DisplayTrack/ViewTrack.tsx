import { FC, useState } from 'react'
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

const ViewTrack : FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const time = useTimer(isRunning);
    const [btnDisabled, setButtonDisabled] = useState(true);
    const [currentPuzzle, setCurrentPuzzle] = useState(0);
    const points = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];


    const [mapWaypoint, setMapWaypoint] = useState<coordSuggestion | undefined>(undefined);
    const handleWaypointChange = (waypoint: coordSuggestion) => {
        setMapWaypoint(waypoint);
        setButtonDisabled(false);
    }

    const startTrack = () => {
        setIsRunning(true);
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
            <TrackBanner background={BackgroundImage}>
                <Container>
                    <TrackInfoBox handleStart={startTrack} />
                </Container>
            </TrackBanner>
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

const TrackBanner = styled(StyledBanner)`
    display: block;
`

const InteractiveBar = styled.div`
    ${flexContainer('space-between','center')};
    padding: 2rem 3.5rem;
    gap: 2rem;

    & > ${StyledTrackPointNavigation} {
        flex: 1;
    }
`;

export default ViewTrack