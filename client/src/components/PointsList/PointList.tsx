import { FC } from 'react'
import { TrackWaypoint, useCreateTrackContext } from 'src/context/CreateTrackContext';
import styled from 'styled-components'
import InfoBox from '../InfoBox';
import { StyledLabelText } from '../Input/Input.styled';
import PointListItem from './PointListItem';
import { flexContainer } from 'src/styles/mixins';

interface IPointListProps {
    pointsArray: TrackWaypoint[],
}

const PointList : FC<IPointListProps> = ({pointsArray}) => {
    const {setFormData} = useCreateTrackContext();

    const handleDeletePoint = (index: number) => {
        setFormData((prevState) => {
            const newArray = [...prevState.trackWaypoints];
            newArray.splice(index,1);

            return {
                ...prevState,
                trackWaypoints: newArray
            }
        })
    }

    return (
        <StyledPointList>
            <StyledLabelText>Dodane Punkty: {pointsArray.length}/10</StyledLabelText>
            {pointsArray.length === 0 && <InfoBox symbol='!'>Nie dodano jeszcze żadnych punktów</InfoBox>}
            {
                pointsArray.map((point,index) => <PointListItem point={point} pointIndex={index+1} handleDelete={()=>{handleDeletePoint(index)}} />)
            }
        </StyledPointList>
    )
}

const StyledPointList = styled.ul`
    display: block;
    position: sticky;
    top: 2.5rem;
    left: 0;

    list-style-type: none;
    padding: 0;

    ${flexContainer('flex-start','stretch','column')};
    gap: 1rem;
`;

export default PointList