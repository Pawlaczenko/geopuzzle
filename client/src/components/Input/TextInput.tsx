import { FC } from 'react'
import styled from 'styled-components'
import { StyledInput } from './Input.styled';
import InputWrapper from './InputWrapper';
import { useFormikContext } from 'formik';
import { IInputProps } from 'src/types/input.types';

const TextInput : FC<IInputProps> = (props) => {
    const {getFieldProps} = useFormikContext();
    return (
        <InputWrapper label={props.label} name={props.name} helpMessage={props.helpMessage}>
            <StyledTextInput
                type={props.type || 'text'} 
                placeholder={props.placeholder}
                id={props.name}
                {...getFieldProps(props.name)}/>
        </InputWrapper>
    )
}

export const StyledTextInput = styled(StyledInput)`
    height: var(--input-height);
`;

export default TextInput