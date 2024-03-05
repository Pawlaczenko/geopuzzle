import { FC } from 'react'
import styled from 'styled-components'
import { BannerBox } from '../Banner';
import { IPuzzleContent } from 'src/types/puzzle.types';
import { getPuzzleById } from 'src/data/puzzleItems.data';
import { flexContainer } from 'src/styles/mixins';
import { getPuzzleContent } from './puzzle.helper';
import { BREAKPOINTS } from 'src/styles/variables';
import ButtonIcon from '../Button/ButtonIcon';

const PuzzleWrapper : FC<{puzzle: IPuzzleContent, handleScroll: ()=>void}> = ({handleScroll,puzzle}) => {
    const puzzleItem = getPuzzleById(puzzle.type);
    const PuzzleIcon = puzzleItem.Icon;
    
    return (
        <StyledPuzzleWrapper>
            <PuzzleWrapperBar>
                <PuzzleIcon />
                {puzzleItem?.label}
            </PuzzleWrapperBar>
            {getPuzzleContent(puzzle)}
            <ButtonIcon onClick={handleScroll} btnType='outline' icon='arrow-down'> </ButtonIcon>
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

    button {
        position: absolute;
        bottom: -2.2rem;
        left: 47%;
        /* transform: translateX(-50%); */
    }
`;

const PuzzleWrapperBar = styled.div`
    ${flexContainer('flex-start','center')}
    gap: 1rem;
    font-size: var(--fs-h6);
    padding: 1rem 1.5rem;
    font-weight: bold;

    background: white;
    border: 2px solid var(--color-primary);
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