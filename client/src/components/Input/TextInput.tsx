import { FC } from 'react'
import styled from 'styled-components'
import { StyledInput } from './Input.styled';
import { IInputProps } from './IInputProps.interface';
import InputWrapper from './InputWrapper';

interface ITextInputProps extends IInputProps {
    placeholder?: string,
    type?: React.HTMLInputTypeAttribute
}

const TextInput : FC<ITextInputProps> = (props) => {
    const type = props.type ? props.type==='textarea' ? undefined : props.type : 'text';
    return (
        <InputWrapper label={props.label} required={props.required} errors={props.errors} name={props.name}>
            <StyledTextInput type={type} name={props.name} placeholder={props.placeholder} required={props.required} id={props.name} $error={props.errors.length > 0} />
        </InputWrapper>
    )
}

const StyledTextInput = styled(StyledInput)`
    height: var(--input-height);
`;


export default TextInput