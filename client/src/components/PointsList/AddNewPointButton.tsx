import { FC } from 'react'
import styled from 'styled-components'
import { StyledPointsListItem } from './PointListItem';
import { useCreateTrackContext } from 'src/context/CreateTrackContext';
import PointNumber from '../PointNumber';

const AddNewPointButton : FC = () => {
    const {setCurrentPoint,formData} = useCreateTrackContext();
    return (
        <StyledAddNewPointButton onClick={()=>{setCurrentPoint(formData.trackWaypoints.length)}}>
            <PointNumber variant='active'>+</PointNumber>
            Dodaj Nowy Punkt
        </StyledAddNewPointButton>
    )
}

const StyledAddNewPointButton = styled(StyledPointsListItem)`
    background: ${({theme}) => theme.body};
    border: var(--border-thin);
    font-family: var(--family-primary);

    &:hover {
        background: ${({theme}) => theme.input};
    }
`;


export default AddNewPointButton