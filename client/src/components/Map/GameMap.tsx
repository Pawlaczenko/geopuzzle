import { FC, useState, useEffect } from 'react'
import { ICustomMapProps } from 'src/types/input.types';
import Map, { StyledMap } from './Map';
import { Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import LocationMarker from './LocationMarker';
import CorrectMarker from './CorrectMarker';
import { styled } from 'styled-components';
import { MdExpandMore } from 'react-icons/md';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';

const GameMap : FC<ICustomMapProps> = ({handleWaypointChange,chosenMarkerCoords,correctMarkerCoords}) => {
    const lineCoords: LatLngExpression[] = [
        chosenMarkerCoords,
        correctMarkerCoords?.coords // Using optional chaining in case correctMarkerCoords is undefined
      ].filter(Boolean); // Remove any undefined values from the array
    return (
        <StyledMapContainer>
            <Map center={chosenMarkerCoords}>
                <LocationMarker handleWaypointChange={handleWaypointChange} chosenMarkerCoords={chosenMarkerCoords} />
                {
                    correctMarkerCoords && <CorrectMarker radius={correctMarkerCoords.radius} chosenMarkerCoords={correctMarkerCoords.coords} />   
                }
                {lineCoords.length === 2 && (
                    <Polyline positions={lineCoords} color="#0081AF" dashArray={[10, 5]} /> // Adjust color as needed
                )}
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