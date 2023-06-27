import { FC } from 'react'
import { IPuzzle } from 'src/data/puzzles.data'
import styled from 'styled-components'
import Heading from '../Heading'
import Paragraph from '../Paragraph.styled'
import { flexContainer } from 'src/styles/mixins'

interface IPuzzleListItemProps {
    handleClick?: ()=>void
}

const PuzzleListItem : FC<IPuzzleListItemProps & IPuzzle> = (props) => {
    return (
        <StyledPuzzleListItem>
            <PuzzleIcon>
                <img src={props.icon} alt={`${props.label} image`} />
            </PuzzleIcon>
            <PuzzleInfo>
                <Heading level='h6'>{props.label}</Heading>
                <Paragraph padding={false} align='left'>{props.description}</Paragraph>
            </PuzzleInfo>
        </StyledPuzzleListItem>
    )
}

const StyledPuzzleListItem = styled.li`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;

    border: var(--border-thin);
    border-radius: 1.5rem;
    padding: 1rem;
    cursor: pointer;

    &:hover {
        background: var(--color-grey);
    }

    &:hover figure {
        background: var(--color-white);
    }
`;

const PuzzleIcon = styled.figure`
    background-color: var(--color-grey);
    border-radius: 1.5rem;
    ${flexContainer('center','center')}
`

const PuzzleInfo = styled.div`
    & > p {
        margin-top: 1rem;
    }
`


export default PuzzleListItem