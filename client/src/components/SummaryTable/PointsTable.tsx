import { FC } from 'react'
import { TrackWaypoint } from 'src/context/CreateTrackContext';
import styled from 'styled-components'
import Heading from '../Heading';
import SummaryTable from './SummaryTable';
import { getPuzzleLabelById } from 'src/data/puzzleItems.data';
import { puzzleID } from 'src/types/puzzle.types';
import { getImageFromObject } from 'src/helpers/files.helper';

const PointsTable : FC<{pointsArray: TrackWaypoint[],}> = ({pointsArray}) => {
    const getPuzzleContentById = (puzzleId: puzzleID, puzzleContent: unknown) : React.ReactNode => {
        switch(puzzleId){
            case 'text':
            default:
                return `${puzzleContent}`;
            case 'image':
                return getImageFromObject(puzzleContent as Blob)
        }
    }
    
    const getPointsMap = () => {
        const points = pointsArray.map(point => new Map<string,React.ReactNode>([
            ["Nazwa Punktu: " ,point.pointName],
            ["Odpowiedź: ",`${point.puzzleCoords.label} - ${point.puzzleCoords.coords}`],
            ["Promień: ",`${point.pointRadius}m`],
            ["Typ Zagadki: ",getPuzzleLabelById(point.puzzleType)],
            ["Treść Zagadki: ",getPuzzleContentById(point.puzzleType,point.puzzleContent)],
            ["Objaśnienie Zagadki: ",point.puzzleExplanation||"Brak"]
        ]));
        return points;
    }
    return (
        <StyledPointsTable>
            <Heading level='h6'>Ilość punktów: {pointsArray.length}/10</Heading>
            {
                getPointsMap().map((point,index) => <SummaryTable summaryData={point} tableHeader={`Punkt ${index+1}`}/>)
            }
        </StyledPointsTable>
    )
}

const StyledPointsTable = styled.div`
    margin-top: 2rem;
`;


export default PointsTable