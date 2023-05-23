import { FC } from 'react'
import styled from 'styled-components'

const InputErrors : FC<{errors: string[]}> = ({errors}) => {
    return (
        <StyledInputErrors>
            {
                errors.map((error) => <StyledInputError>{error}</StyledInputError>)
            }
        </StyledInputErrors>
    )
}

const StyledInputErrors = styled.div`
    margin-top: 1rem;   
`;

const StyledInputError = styled.span`
    color: var(--color-error);
    display: block;
`


export default InputErrors