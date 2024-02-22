import { FC, useRef, useState, useEffect } from 'react'
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
import { IPuzzle, IPuzzleContent } from 'src/types/puzzle.types';
import Container from 'src/layout/Container';
import TrackItem, { ITrackItemProps } from 'src/components/TrackItem/TrackItem';
import TrackSwiper from 'src/components/TrackSwiper';
import { BREAKPOINTS } from 'src/styles/variables';
import { getOneTrack } from 'src/services/TrackService';
import { Routes, Route, useParams } from 'react-router-dom';
import { ITrackInfoBox } from 'src/components/TrackInfoBox';
import useWebSocket, { ReadyState } from "react-use-websocket"

const ViewTrack : FC = () => {
    const WS_URL = "ws://127.0.0.1:3000/game"
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        WS_URL,
        {
            share: true,
            shouldReconnect: () => true,
        },
    );

    useEffect(() => {
        console.log(readyState);
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                "command": "select",// select, start, answer, next, exit 
                "content": {
                    "id": "65d4ffcd08d6a00d0ccd4927" //select, id trasy
                }
            })
        }
      }, [readyState]);

      useEffect(() => {
        if(lastJsonMessage && Object.keys(lastJsonMessage).length > 0 && !isRunning){
            setcurrentPuzzle(lastJsonMessage);
            setCurrentPuzzleIndex(0);
            setIsRunning(true);
    
            if (interactiveBarRef.current) {
                interactiveBarRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        } else if(isRunning) {
            console.log(lastJsonMessage);
        }
        console.log(lastJsonMessage);
      }, [lastJsonMessage]);

    const [isRunning, setIsRunning] = useState(false);
    // const time = useTimer(isRunning);
    const [btnDisabled, setButtonDisabled] = useState(true);
    const [currentTrack, setCurrentTrack] = useState<ITrackInfoBox | null>(null);
    const [currentPuzzle, setcurrentPuzzle] = useState<IPuzzleContent | null>(null);
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [points, setPoints] = useState([]);
    // const points = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    
    const interactiveBarRef = useRef<HTMLDivElement>(null);
    let {track_id} = useParams();
    
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [mapWaypoint, setMapWaypoint] = useState<coordSuggestion | undefined>(undefined);
    const handleWaypointChange = (waypoint: coordSuggestion) => {
        setMapWaypoint(waypoint);
        setButtonDisabled(false);
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
        console.log(mapWaypoint.coords.lng);
        console.log(mapWaypoint.coords.lat);
        sendJsonMessage({
            "command": "answer",
            "content": {
                "long": mapWaypoint.coords.lng,
                "lat": mapWaypoint.coords.lat
            }
        });
    }

    const textPuzzle : IPuzzleContent = {
        type: 'text',
        payload: 'Państwo o tej stolicy zostało zaatakowane przez III Rzeszę 1 września 1939, co zapoczątkowało II Wojnę Światową.'
    }

    useEffect(() => {
        async function fetchTrack() {
            setIsLoading(true);
            const trackData = await getOneTrack(track_id);

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
                            <ButtonIcon btnType='regular' icon='check' disabled={btnDisabled} onClick={checkAnswer} >Sprawdź</ButtonIcon>
                            {/* <StopWatch time={time}/> */}
                        </InteractiveBar>
                        <PuzzleWrapper puzzle={currentPuzzle} />
                        <GameMap chosenMarkerCoords={mapWaypoint?.coords} handleWaypointChange={handleWaypointChange} />
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

export default ViewTrack