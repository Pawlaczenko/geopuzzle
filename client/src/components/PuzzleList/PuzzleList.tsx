import { FC } from 'react'
import { PUZZLES } from 'src/data/puzzles.data'
import styled from 'styled-components'
import PuzzleListItem from './PuzzleListItem'

const PuzzleList : FC = () => {
    return (
        <StyledPuzzleList>
            {
                PUZZLES.map((puzzle) => (
                    <PuzzleListItem {...puzzle} />
                ))
            }
        </StyledPuzzleList>
    )
}

const StyledPuzzleList = styled.ul`
    list-style-type: none;
    padding: 0;
    
    --puzzle-card-width: 35rem;
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(var(--puzzle-card-width),1fr));
    gap: 2rem; 
`;


export default PuzzleList