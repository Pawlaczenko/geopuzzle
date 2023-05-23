import { FC } from 'react'
import { StyledLabel, StyledLabelText } from './Input.styled';
import InputErrors from './InputErrors';

interface IInputWrapperProps {
    label: string,
    errors: string[],
    required?: boolean,
    name: string,
    children: React.ReactNode,
}

const InputWrapper : FC<IInputWrapperProps> = (props) => {
    return (
        <StyledLabel htmlFor={props.name}>
            <StyledLabelText>{props.label} {props.required && "*"}</StyledLabelText>
            {props.children}
            <InputErrors errors={props.errors} />
        </StyledLabel>
    )
}

export default InputWrapper