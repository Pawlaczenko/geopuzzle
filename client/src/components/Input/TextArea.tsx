import { FC } from 'react'
import styled from 'styled-components'
import { StyledInput, StyledLabel, StyledLabelText } from './Input.styled';
import { IInputProps } from './IInputProps.interface';

interface ITextAreaProps extends IInputProps {
    placeholder?: string
}

const TextArea : FC<ITextAreaProps> = (props) => {
    return (
        <StyledLabel htmlFor={props.name}>
            <StyledLabelText>{props.label} {props.required && "*"}</StyledLabelText>
            <StyledTextArea as='textarea' name={props.name} placeholder={props.placeholder} required={props.required} id={props.name} />
        </StyledLabel>
    )
}

const StyledTextArea = styled(StyledInput)`
    resize: vertical;
    padding-top: 2rem;
    min-height: calc(4 * var(--input-height));
`;


export default TextArea