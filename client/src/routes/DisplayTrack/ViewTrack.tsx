import { FC, useRef, useState, useEffect } from 'react'
import { StyledBanner } from 'src/components/Banner';
import Page from 'src/layout/Page.styled';
import TrackInfoBox from 'src/components/TrackInfoBox';
import { styled } from 'styled-components';
import { flexContainer } from 'src/styles/mixins';
import TrackPointNavigation, { StyledTrackPointNavigation } from 'src/components/TrackPointNavigation';
import StopWatch from 'src/components/StopWatch';
import ButtonIcon from 'src/components/Button/ButtonIcon';
import GameMap from 'src/components/Map/GameMap';
import { coordSuggestion } from 'src/types/input.types';
import PuzzleWrapper from 'src/components/Puzzles/PuzzleWrapper';
import { IPuzzle, IPuzzleContent } from 'src/types/puzzle.types';
import Container from 'src/layout/Container';
import TrackItem, { ITrackItemProps } from 'src/components/TrackItem/TrackItem';
import TrackSwiper from 'src/components/TrackSwiper';
import { BREAKPOINTS } from 'src/styles/variables';
import { getOneTrack } from 'src/services/TrackService';
import { Routes, Route, useParams } from 'react-router-dom';
import { ITrackInfoBox } from 'src/components/TrackInfoBox';
import useWebSocket, { ReadyState } from "react-use-websocket"
import { LatLngExpression } from 'leaflet';
import WaypointSummary, { IWaypointSummary } from 'src/components/Game/WaypointSummary';
import GameSummary, { IGameSummary } from 'src/components/Game/GameSummary';

export interface ICorrectAnswerMarker {
    coords: LatLngExpression,
    radius: number
}

const ViewTrack : FC = () => {
    const WS_URL = "ws://127.0.0.1:3000/game"
    const { sendJsonMessage, lastJsonMessage, readyState } : { sendJsonMessage: Function, lastJsonMessage: any, readyState: number } = useWebSocket(
        WS_URL,
        {
            share: true,
            shouldReconnect: () => true,
        },
    );

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                "command": "select",// select, start, answer, next, exit 
                "content": {
                    "id": track_id //select, id trasy
                }
            })
        }
      }, [readyState]);

      useEffect(() => {
        if(!lastJsonMessage) return;

        const event = lastJsonMessage.event;
        switch(event) {
            case 'start':
                setcurrentPuzzle(lastJsonMessage);
                setCurrentPuzzleIndex(0);
                setIsRunning(true);
        
                scrollToBar();
            break;
            case 'answer':
                /// Set coords on map
                const correctCoords : ICorrectAnswerMarker = {
                    coords: {
                        lat: lastJsonMessage.wp.coords.lat,
                        lng: lastJsonMessage.wp.coords.long,
                    },
                    radius: lastJsonMessage.wp.coords.radius
                }
                setCorrectAnswerMarker(correctCoords);

                ///set summary in table
                const summary : IWaypointSummary = {
                    answer: lastJsonMessage.wp.name,
                    points: lastJsonMessage.score,
                    explanation: lastJsonMessage.wp.explenation,
                    handleNext: nextQuestion
                }
                setWaypointSummary(summary);

                setIsPaused(true);
            break;
            case 'next': 
                setIsPaused(false);

                setButtonDisabled(true);
                setCorrectAnswerMarker(null);
                setMapWaypoint(null);
                setWaypointSummary(null);
                setcurrentPuzzle(lastJsonMessage);
            break;
            case 'finish':
                setIsFinished(true);
                setIsPaused(true);
                setIsRunning(false);

                const gSummary : IGameSummary = {
                    score: lastJsonMessage.totalScore,
                    time: lastJsonMessage.time
                }
                setGameSummary(gSummary);
            break;
            default:
            break;
        }
        console.log(lastJsonMessage);
    }, [lastJsonMessage]);

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    
    const [btnDisabled, setButtonDisabled] = useState(true);
    const [currentTrack, setCurrentTrack] = useState<ITrackInfoBox | null>(null);
    const [currentPuzzle, setcurrentPuzzle] = useState<IPuzzleContent | null>(null);
    const [correctAnswerMarker, setCorrectAnswerMarker] = useState<ICorrectAnswerMarker | null>(null);
    const [waypointSummary, setWaypointSummary] = useState<IWaypointSummary | null>(null);
    const [gameSummary, setGameSummary] = useState<IGameSummary | null>(null);
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [points, setPoints] = useState<number[]>([]);
    
    const interactiveBarRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    let {track_id} = useParams();
    
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const [mapWaypoint, setMapWaypoint] = useState<coordSuggestion | null>(null);
    const handleWaypointChange = (waypoint: coordSuggestion) => {
        if(!isPaused){
            setMapWaypoint(waypoint);
            setButtonDisabled(false);
        }
    }

    const startTrack = async () => {
        if (readyState === ReadyState.OPEN) {
            await sendJsonMessage({
                "command": "start",
                "content": {
                }
            });
        }
    }

    const checkAnswer = () => {
        scrollToMap();
        sendJsonMessage({
            "command": "answer",
            "content": {
                "long": mapWaypoint?.coords.lng,
                "lat": mapWaypoint?.coords.lat
            }
        });
    }

    const nextQuestion = () => {
        const oldPoints : number[] = [...points];
        oldPoints[currentPuzzleIndex] = 1;
        setPoints(oldPoints);
        setCurrentPuzzleIndex(index => index + 1);
        scrollToBar();
    
        sendJsonMessage({
            "command": "next",
            "content": {
            }
        });
    }

    const scrollToMap = () => {
        if (mapRef.current) {
            mapRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    const scrollToBar = () => {
        if (interactiveBarRef.current) {
            interactiveBarRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }
    
    const textPuzzle : IPuzzleContent = {
        type: 'text',
        payload: 'Państwo o tej stolicy zostało zaatakowane przez III Rzeszę 1 września 1939, co zapoczątkowało II Wojnę Światową.'
    }

    useEffect(() => {
        async function fetchTrack() {
            setIsLoading(true);
            if(!track_id) return;
            const trackData : any = await getOneTrack(track_id);

            const infoBox : ITrackInfoBox = {
                id: trackData.id,
                name: trackData.name,
                description: trackData.description,
                tags: trackData.tags,
                puzzleCount: trackData.waypoints.length,
                thumbnail: trackData.thumbnail
            }

            setPoints(Array(trackData.waypoints.length).fill(-1));
            setCurrentTrack(infoBox);
            setThumbnailUrl('http://localhost:3000'+trackData.thumbnail);
            setIsLoading(false);
        }
        fetchTrack();
    },[]);

    return (
        <>
        {
            !isLoading && 
            <Page>
                <StyledThumbnail>
                    <img src={thumbnailUrl} />
                </StyledThumbnail>
                <TrackBanner background={thumbnailUrl}>
                    <Container>
                        <TrackInfoBox track={currentTrack} handleStart={startTrack} />
                    </Container>
                </TrackBanner>
                <ScrollAnchor ref={interactiveBarRef}></ScrollAnchor>
                {
                    isRunning &&             
                    <Container>
                        <InteractiveBar>
                            <TrackPointNavigation currentIndex={currentPuzzleIndex} points={points} />

                            {
                                isPaused
                                ? <ButtonIcon btnType='outline' icon='start' onClick={nextQuestion} >Następne pytanie</ButtonIcon>
                                : <ButtonIcon btnType='regular' icon='check' disabled={btnDisabled} onClick={checkAnswer} >Sprawdź</ButtonIcon>
                            }
                            
                            <StopWatch isRunning={isRunning && !isPaused}/>
                        </InteractiveBar>
                        {currentPuzzle && <PuzzleWrapper puzzle={currentPuzzle} handleScroll={scrollToMap} />}
                        <ScrollAnchor ref={mapRef}></ScrollAnchor>
                        <GameMap
                            correctMarkerCoords={correctAnswerMarker} 
                            chosenMarkerCoords={mapWaypoint?.coords} 
                            handleWaypointChange={handleWaypointChange} />
                                                    {
                            isPaused && waypointSummary &&
                            <WaypointSummary summary={waypointSummary} />
                        }
                        <ButtonsWrapper>
                            {
                                !isPaused && <ButtonIcon btnType='regular' icon='check' disabled={btnDisabled} onClick={checkAnswer} >Sprawdź</ButtonIcon>
                            }
                        </ButtonsWrapper>
                    </Container>
                }
                {
                    isFinished && gameSummary &&
                    <Container>
                        <GameSummary summary={gameSummary} />
                    </Container>
                }
                <Container>
                    <TrackSwiper />
                </Container>
            </Page>
        }
        </>
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

const ButtonsWrapper = styled.div`
    margin: auto;
`;

export default ViewTrack