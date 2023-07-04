import { FC } from 'react'
import styled from 'styled-components'
import FileInput from '../Input/FileInput';
import InfoBox from '../InfoBox';

const ImagePuzzleForm : FC = () => {
    return (
        <StyledImagePuzzleForm>
            <FileInput label={'Dodaj Zdjęcie'} name={'puzzleContent'} />
            <InfoBox>Pamiętam, aby zdjęcie odzwierciedlało punkt na mapie, który ma odgadnąć użytkownik.</InfoBox>
        </StyledImagePuzzleForm>
    )
}

const StyledImagePuzzleForm = styled.div`

`;


export default ImagePuzzleForm