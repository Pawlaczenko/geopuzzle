import { FC } from 'react'
import { TrackWaypoint, useCreateTrackContext } from 'src/context/CreateTrackContext';
import { IPuzzleItem, getPuzzleById } from 'src/data/puzzleItems.data';
import { flexContainer } from 'src/styles/mixins';
import styled from 'styled-components'
import {FiX} from "react-icons/fi";
import PointNumber from '../PointNumber';
import { BREAKPOINTS } from 'src/styles/variables';

interface IPointListItemProps {
    point: TrackWaypoint,
    pointIndex: number,
    handleDelete: ()=>void,
}

const PointListItem : FC<IPointListItemProps> = ({point,pointIndex,handleDelete}) => {
    const id = String(pointIndex).padStart(2,'0');
    const puzzle : IPuzzleItem = getPuzzleById(point.puzzleType);
    const PuzzleIcon = puzzle.Icon;
    const {setCurrentPoint} = useCreateTrackContext();

    const handleDeleteClick = (e:React.MouseEvent) => {
        e.stopPropagation();
        handleDelete();
    }

    return (
        <StyledPointsListItem>
            <PointNumber variant='active'>{id}</PointNumber>
            <PointInfo>
                {point.pointName}
                <PuzzleType>
                    <PuzzleIcon />
                    {puzzle.label}
                </PuzzleType>
            </PointInfo>
            <DeleteButton onClick={handleDeleteClick}><FiX /></DeleteButton>
        </StyledPointsListItem>
    )
}

export const StyledPointsListItem = styled.li`
    background: var(--color-grey-light);
    padding: 1rem 1.5rem;
    border-radius: .5rem 0 0 .5rem;
    font-family: var(--family-primary);

    ${flexContainer('flex-start','center')};
    gap: 2rem;

`;

const PointInfo = styled.div`
    font-size: 1.8rem;
`

const PuzzleType = styled.div`
    font-size: 1.2rem;
    color: ${({theme}) => theme.textBlue};

    ${flexContainer('flex-start','center')};
    gap: .5rem;

    @media only screen and (${BREAKPOINTS.phone}){
        font-size: 1.2rem;
    }
`
const DeleteButton = styled.button`
    height: 100%;
    border-radius: .5rem;
    flex-shrink: 0;
    margin-left: auto;
    color: white;
    font-size: 2.5rem;

    background: var(--color-error);
    border: 1px solid var(--color-error);

    & > svg {
        margin: 0 auto;
    }

    &:hover {
        border: 1px solid black;
        cursor: pointer;
    }
`

export default PointListItem