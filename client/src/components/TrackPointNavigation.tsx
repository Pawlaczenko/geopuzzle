import { FC } from 'react'
import styled from 'styled-components'
import { flexContainer } from 'src/styles/mixins';
import PointNumber, { pointNumberVariant } from './PointNumber';
import React from 'react';

const TrackPointNavigation : FC = () => {
    const points = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    const currentIndex = -1;

    const getNumberVariant = (state: number, currentIndex: number, index: number) : pointNumberVariant => {
        switch(state){
            case 0: return 'incorrect';
            case 1: return 'correct';
            case -1:
            default: {
                return currentIndex === index ? 'active' : 'disabled';
            }
        }
    }
 
    return (
        <StyledTrackPointNavigation>
            {
                points.map((state,index) => (
                    <PointNumber 
                        as="li" 
                        variant={getNumberVariant(state,currentIndex,index)} 
                        size={'small'} 
                        lifted={currentIndex===index}>
                            {index+1}
                    </PointNumber>
                ))
            }
        </StyledTrackPointNavigation>
    )
}

export const StyledTrackPointNavigation = styled.ul`
    list-style-type: none;
    padding: 0;

    ${flexContainer('flex-start','center')};
    gap: .5rem;
`;


export default React.memo(TrackPointNavigation)