import { FC, useState } from 'react'
import { ICustomMapProps } from 'src/types/input.types';
import Map, { StyledMap } from './Map';
import LocationMarker from './LocationMarker';
import { styled } from 'styled-components';
import { MdExpandMore } from 'react-icons/md';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';

const GameMap : FC<ICustomMapProps> = ({handleWaypointChange,chosenMarkerCoords}) => {
    return (
        <StyledMapContainer>
            <Map center={chosenMarkerCoords}>
                <LocationMarker handleWaypointChange={handleWaypointChange} chosenMarkerCoords={chosenMarkerCoords} />
            </Map>
        </StyledMapContainer>
    )
}

const StyledMapContainer = styled.div`
    margin: 0 3rem 3rem 3rem;
    position: relative;

    & > ${StyledMap} {
        width: 100%;
        transition: height .2s ease-in-out;
    }

    @media only screen and (${BREAKPOINTS.lg}){
        margin: 0;
        margin-bottom: 2rem;
    }
`

export default GameMap