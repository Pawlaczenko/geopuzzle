import { FC, useEffect, useRef } from 'react'
import { StyledLabel, StyledLabelText } from './Input.styled';
import InputErrors from './InputErrors';

interface IInputWrapperProps {
    label: string,
    errors?: string[],
    required?: boolean,
    name: string,
    children: React.ReactNode,
}

const InputWrapper : FC<IInputWrapperProps> = (props) => {
    const elementRef = useRef<HTMLLabelElement>(null);
    useEffect(() => {
        if(props.errors && props.errors.length > 0) {
            if(elementRef.current) elementRef.current.scrollIntoView();
        }
    },[props.errors]);

    return (
        <StyledLabel htmlFor={props.name} ref={elementRef}>
            <StyledLabelText>{props.label} {props.required && "*"}</StyledLabelText>
            {props.children}
            <InputErrors errors={props.errors} />
        </StyledLabel>
    )
}

export default InputWrapper