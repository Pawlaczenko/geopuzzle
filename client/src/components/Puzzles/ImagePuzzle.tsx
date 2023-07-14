import { FC } from 'react'
import styled from 'styled-components'

const ImagePuzzle : FC<{url: string}> = ({url}) => {
    return (
        <StyledImagePuzzle>
            <img src={url} alt="Image" />
        </StyledImagePuzzle>
    )
}

const StyledImagePuzzle = styled.div`
    padding: 0 3rem;
`;


export default ImagePuzzle