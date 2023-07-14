import { FC, useState } from 'react'
import { ICustomMapProps } from 'src/types/input.types';
import Map, { StyledMap } from './Map';
import LocationMarker from './LocationMarker';
import { styled } from 'styled-components';
import { MdExpandMore } from 'react-icons/md';
import { flexContainer } from 'src/styles/mixins';

const GameMap : FC<ICustomMapProps> = ({handleWaypointChange,chosenMarkerCoords}) => {
    const [isExpanded,setIsExpanded] = useState<boolean>(false);

    const toggleExpandMap = () => {
        setIsExpanded((prev)=>!prev);
    }

    return (
        <StyledMapContainer isExpanded={isExpanded}>
            <Map center={chosenMarkerCoords}>
                <LocationMarker handleWaypointChange={handleWaypointChange} chosenMarkerCoords={chosenMarkerCoords} />
            </Map>
            <FullScreenButton isExpanded={isExpanded} onClick={toggleExpandMap}>
                <MdExpandMore />
            </FullScreenButton>
        </StyledMapContainer>
    )
}

const StyledMapContainer = styled.div<{isExpanded:boolean}>`
    margin: 0 3rem 3rem 3rem;
    position: relative;

    & > ${StyledMap} {
        width: 100%;
        transition: height .2s ease-in-out;
        height: ${(props) => props.isExpanded ? '40rem' : '15rem'};
    }
`

const FullScreenButton = styled.button<{isExpanded: boolean}>`
    width: 8rem;
    height: 2rem;
    aspect-ratio: 1/1;
    background: white;
    box-shadow: 0 .2rem 0 .2rem rgba(0,0,0,.15);
    border-radius: .2rem;
    z-index: 1;

    cursor: pointer;
    position: absolute;
    bottom: -2rem;
    left: calc(50% - 4rem);

    ${flexContainer('center','center')};
    & > svg {
        width: 4rem;
        height: 4rem;
        transform: rotate(${(props)=>props.isExpanded ? '180deg' : '0deg'});
        transition: transform .2s ease-in-out;
    }
`

export default GameMap