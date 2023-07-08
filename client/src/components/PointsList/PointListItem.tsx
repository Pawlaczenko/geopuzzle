import { FC } from 'react'
import { TrackWaypoint } from 'src/context/CreateTrackContext';
import { IPuzzleItem, PUZZLES } from 'src/data/puzzleItems.data';
import { flexContainer } from 'src/styles/mixins';
import styled from 'styled-components'
import {FiX} from "react-icons/fi";
import Modal from '../Modal/Modal';

interface IPointListItemProps {
    point: TrackWaypoint,
    pointIndex: number,
    handleDelete: ()=>void
}

const PointListItem : FC<IPointListItemProps> = ({point,pointIndex,handleDelete}) => {
    const id = String(pointIndex).padStart(2,'0');
    const puzzle : IPuzzleItem = PUZZLES.find(item => item.id === point.puzzleType) || PUZZLES[0];
    const PuzzleIcon = puzzle.Icon;

    return (
        <StyledPointsListItem>
            <PointNumber>{id}</PointNumber>
            <PointInfo>
                {point.pointName}
                <PuzzleType>
                    <PuzzleIcon />
                    {puzzle.label}
                </PuzzleType>
            </PointInfo>
            <DeleteButton onClick={handleDelete}><FiX /></DeleteButton>
        </StyledPointsListItem>
    )
}

const StyledPointsListItem = styled.li`
    background: var(--color-grey-light);
    padding: 1rem 1.5rem;
    border-radius: .5rem 0 0 .5rem;

    ${flexContainer('flex-start','center')};
    gap: 2rem;
`;

const PointNumber = styled.figure`
    background: var(--gradient-primary);

    font-weight: var(--fw-bold);
    font-size: 3rem;
    font-family: var(--family-primary);
    line-height: 1;

    ${flexContainer('center','center')};
    flex-shrink: 0;
    border-radius: .5rem;
    width: 6rem;
    aspect-ratio: 1/1;
`

const PointInfo = styled.div`
    font-size: 2.1rem;
`

const PuzzleType = styled.div`
    font-size: 1.6rem;
    color: var(--color-dark);

    ${flexContainer('flex-start','center')};
    gap: .5rem;
`
const DeleteButton = styled.button`
    width: 4rem;
    height: 100%;
    border-radius: .5rem;
    flex-shrink: 0;
    margin-left: auto;
    color: white;
    font-size: 2.5rem;

    background: var(--color-error);
    opacity: .5;

    & > svg {
        margin: 0 auto;
    }

    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`

export default PointListItem