import { FC, useState } from 'react'
import { TrackWaypoint, useCreateTrackContext } from 'src/context/CreateTrackContext';
import styled from 'styled-components'
import InfoBox from '../InfoBox';
import { StyledLabelText } from '../Input/Input.styled';
import PointListItem from './PointListItem';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';
import Modal, { ModalFooter } from '../Modal/Modal';
import Button from '../Button/Button.styled';
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModal';

interface IPointListProps {
    pointsArray: TrackWaypoint[],
}

const PointList : FC<IPointListProps> = ({pointsArray}) => {
    const {setFormData} = useCreateTrackContext();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
    const [pointToDelete, setPointToDelete] = useState<number>();

    const handleDeletePoint = (index: number) => {
        setIsModalOpen(false);
        setFormData((prevState) => {
            const newArray = [...prevState.trackWaypoints];
            newArray.splice(index,1);

            return {
                ...prevState,
                trackWaypoints: newArray
            }
        })
    }

    const handleOpenModal = (index: number) => {
        setPointToDelete(index);
        setIsModalOpen(true);
    }

    return (
        <StyledPointList>
            <StyledLabelText>Dodane Punkty: {pointsArray.length}/10</StyledLabelText>
            {pointsArray.length === 0 && <InfoBox symbol='!'>Nie dodano jeszcze żadnych punktów</InfoBox>}
            {
                pointsArray.map((point,index) => <PointListItem point={point} pointIndex={index+1} handleDelete={()=>{handleOpenModal(index)}} />)
            }
            {
                pointToDelete!==undefined && 
                <DeleteConfirmationModal 
                    shouldShow={isModalOpen} 
                    handleClose={()=>{setIsModalOpen(false)}} 
                    itemLabel={`Punkt ${pointToDelete+1}`} 
                    onDelete={()=>{handleDeletePoint(pointToDelete)}}/>
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

    @media only screen and (${BREAKPOINTS.phone}){
        position: relative;
        top: 0;
    }
`;

export default PointList