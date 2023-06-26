import { FC } from 'react'
import styled from 'styled-components'
import { StyledLabel, StyledLabelText } from './Input/Input.styled';
import ButtonIcon from './Button/ButtonIcon';
import { ICONS } from 'src/data/icons.data';

const AddPuzzleLabel : FC = () => {
    return (
        <StyledAddPuzzleLabel>
            <StyledLabelText>Zagadka w tym punkcie: *</StyledLabelText>
            <StyledInfoText>Do tego punktu jeszcze nie dodano zagadki</StyledInfoText>
            <ButtonIcon btnType='yellow' icon="puzzle">Dodaj zagadkę</ButtonIcon>
        </StyledAddPuzzleLabel>
    )
}

const StyledAddPuzzleLabel = styled(StyledLabel)`
    border: var(--border-thin);
    border-radius: 1.5rem;
    padding: 2rem 1rem;

    & > button {
        margin: 0 auto;
    }
`

const StyledInfoText = styled.p`
    padding: 1rem 0 2rem 3rem;
    color: var(--color-secondary);
`;


export default AddPuzzleLabel