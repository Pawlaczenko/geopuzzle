import { FC } from 'react'
import styled from 'styled-components'
import { PointNumber, StyledPointsListItem } from './PointListItem';
import { useCreateTrackContext } from 'src/context/CreateTrackContext';

const AddNewPointButton : FC = () => {
    const {setCurrentPoint,formData} = useCreateTrackContext();
    return (
        <StyledAddNewPointButton onClick={()=>{setCurrentPoint(formData.trackWaypoints.length)}}>
            <PointNumber>+</PointNumber>
            Dodaj Nowy Punkt
        </StyledAddNewPointButton>
    )
}

const StyledAddNewPointButton = styled(StyledPointsListItem)`
    background: white;
    border: var(--border-thin);
    font-family: var(--family-primary);

    &:hover {
        background: var(--color-grey-light);
    }
`;


export default AddNewPointButton