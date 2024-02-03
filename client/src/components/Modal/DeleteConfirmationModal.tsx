import { FC } from 'react'
import Modal, { IModalProps, ModalFooter } from './Modal'
import InfoBox from '../InfoBox'
import Button from '../Button/Button.styled'

interface IDeleteModalProps {
    itemLabel: string,
    onDelete: ()=>void
}

const DeleteConfirmationModal : FC<IModalProps & IDeleteModalProps> = (props) => {
    return (
        <Modal shouldShow={props.shouldShow} handleClose={props.handleClose} title="Potwierdzenie usunięcia">
            <InfoBox variant='danger' symbol='!'>Czy na pewno chcesz usunąć {props.itemLabel}?</InfoBox>
            <ModalFooter>
                <Button variant='outline' onClick={props.handleClose}>Anuluj</Button>
                <Button variant='outline' onClick={props.onDelete}>Usuń</Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteConfirmationModal