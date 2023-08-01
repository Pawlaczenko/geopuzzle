import { FC } from 'react';
import styled from 'styled-components'
import InputMessage from './InputMessage';

const InputErrors : FC<{errors?: string | string[]}> = ({errors}) => {
    const errorsArray = typeof errors === 'string' ? [errors] : errors ? [...errors] : [];
    return (
        <StyledInputErrors>
            {
                errorsArray.map((error,index) => <InputMessage message={error} type='error' key={`error-${index}`} />)
            }
        </StyledInputErrors>
    )
}

const StyledInputErrors = styled.div`
    
`;


export default InputErrors