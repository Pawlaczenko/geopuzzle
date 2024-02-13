import { FC } from 'react'
import styled from 'styled-components'
import { BannerBox } from '../Banner';
import { IPuzzleContent } from 'src/types/puzzle.types';
import { getPuzzleById } from 'src/data/puzzleItems.data';
import { flexContainer } from 'src/styles/mixins';
import { getPuzzleContent } from './puzzle.helper';
import { BREAKPOINTS } from 'src/styles/variables';

const PuzzleWrapper : FC<{puzzle: IPuzzleContent}> = ({puzzle}) => {
    const puzzleItem = getPuzzleById(puzzle.type);
    const PuzzleIcon = puzzleItem.Icon;
    
    return (
        <StyledPuzzleWrapper>
            <PuzzleWrapperBar>
                <PuzzleIcon />
                {puzzleItem?.label}
            </PuzzleWrapperBar>
            {getPuzzleContent(puzzle)}
        </StyledPuzzleWrapper>
    )
}

const StyledPuzzleWrapper = styled(BannerBox)`
    width: 75%;
    margin: 6rem auto;
    position: relative;

    padding: 5rem 1rem 4rem 1rem;

    @media only screen and (${BREAKPOINTS.lg}){
        width: 100%;
        padding: 5rem 1rem 2rem 1rem;
        margin: 6rem auto 3rem auto;
    }
`;

const PuzzleWrapperBar = styled.div`
    ${flexContainer('flex-start','center')}
    gap: 1rem;
    font-size: var(--fs-h6);
    padding: 1rem 1.5rem;
    font-weight: bold;

    background:${({theme}) => theme.decoration};
    position: absolute;
    left: 50%;
    top: -2rem;
    transform: translateX(-50%);
    
    border-radius: 1.5rem;

    &>svg {
        width: 3rem;
        height: 3rem;
    }

    @media only screen and (${BREAKPOINTS.phone}){
        font-size: var(--fs-paragraph);
        left: 1.6rem;
        transform: none;
    }
`;


export default PuzzleWrapper