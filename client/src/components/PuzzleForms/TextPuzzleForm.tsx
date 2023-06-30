import { FC } from 'react'
import styled from 'styled-components'
import TextArea from '../Input/TextArea';
import InfoBox from '../InfoBox';

const TextPuzzleForm : FC = () => {
    return (
        <StyledTextPuzzleForm>
            <TextArea label={'Treść Zagadki'} name={'puzzle-text-content'} placeholder='Podaj treść zagadki' />
            <InfoBox>Pamiętaj, aby treść zagadki odpowiadała punktowi na mapie.</InfoBox>
        </StyledTextPuzzleForm>
    )
}

const StyledTextPuzzleForm = styled.div`

`;


export default TextPuzzleForm