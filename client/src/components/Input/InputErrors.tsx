import { FC } from 'react';
import { MdOutlineError } from 'react-icons/md';
import { flexContainer } from 'src/styles/mixins';
import styled from 'styled-components'

const InputErrors : FC<{errors?: string[]}> = ({errors}) => {
    return (
        <StyledInputErrors>
            {
                errors && errors.map((error,index) => <StyledInputError key={`error-${index}`} ><MdOutlineError /> {error}</StyledInputError>)
            }
        </StyledInputErrors>
    )
}

const StyledInputErrors = styled.div`
    margin-top: 1rem;   
`;

const StyledInputError = styled.span`
    color: var(--color-error);
    ${flexContainer('flex-start','center')};
    gap: 1rem;
    & > svg {
        width: 2rem;
        height: 2rem;
    }
`


export default InputErrors