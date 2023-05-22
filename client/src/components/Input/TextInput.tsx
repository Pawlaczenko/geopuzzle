import { FC } from 'react'
import styled from 'styled-components'
import { StyledInput, StyledLabel, StyledLabelText } from './Input.styled';
import { IInputProps } from './IInputProps.interface';

interface ITextInputProps extends IInputProps {
    placeholder?: string,
    type?: React.HTMLInputTypeAttribute
}

const TextInput : FC<ITextInputProps> = (props) => {
    const type = props.type ? props.type==='textarea' ? undefined : props.type : 'text';
    return (
        <StyledLabel htmlFor={props.name}>
            <StyledLabelText>{props.label} {props.required && "*"}</StyledLabelText>
            <StyledTextInput type={type} name={props.name} placeholder={props.placeholder} required={props.required} id={props.name} />
        </StyledLabel>
    )
}

const StyledTextInput = styled(StyledInput)`
    --input-height: 5.2rem;
    height: var(--input-height);
`;


export default TextInput