import { FC } from 'react'
import styled from 'styled-components'
import { StyledInput } from './Input.styled';
import InputWrapper from './InputWrapper';
import { useFormikContext } from 'formik';
import { IInputProps } from './IInputProps.interface';

const TextInput : FC<IInputProps> = (props) => {
    const {getFieldProps} = useFormikContext();
    return (
        <InputWrapper label={props.label} name={props.name}>
            <StyledTextInput
                type={props.type || 'text'} 
                placeholder={props.placeholder}
                id={props.name}
                {...getFieldProps(props.name)}/>
        </InputWrapper>
    )
}

const StyledTextInput = styled(StyledInput)`
    height: var(--input-height);
`;


export default TextInput