import { FC } from 'react'
import styled from 'styled-components'
import { StyledLabel, StyledLabelText } from './Input/Input.styled';
import ButtonIcon from './Button/ButtonIcon';

const AddPuzzleLabel : FC<{handleModalClick: ()=>void}> = ({handleModalClick}) => {
    return (
        <StyledAddPuzzleLabel>
            <StyledLabelText>Zagadka w tym punkcie: *</StyledLabelText>
            <StyledInfoText>Do tego punktu jeszcze nie dodano zagadki</StyledInfoText>
            <ButtonIcon type='button' onClick={handleModalClick} btnType='yellow' icon="puzzle">Dodaj zagadkę</ButtonIcon>
        </StyledAddPuzzleLabel>
    )
}

const StyledAddPuzzleLabel = styled.section`
    border: var(--border-thin);
    border-radius: 1.5rem;
    padding: 2rem 1rem;
    width: 100%;

    & > button {
        margin: 0 auto;
    }
`

const StyledInfoText = styled.p`
    padding: 1rem 0 2rem 3rem;
    color: var(--color-secondary);
`;


export default AddPuzzleLabel