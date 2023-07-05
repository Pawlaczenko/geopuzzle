import { FC } from 'react'
import { StyledLabel, StyledLabelText } from './Input.styled';
import InputErrors from './InputErrors';
import { FormikErrors, FormikTouched, useFormikContext } from 'formik';

interface IInputWrapperProps {
    label: string,
    name: string,
    children: React.ReactNode,
}

const InputWrapper : FC<IInputWrapperProps> = (props) => {
    const {errors, touched} = useFormikContext();
    const fieldErrors : string | string[] | undefined = errors[props.name as keyof FormikErrors<unknown>];
    const touchedField : boolean | undefined = touched[props.name as keyof FormikTouched<unknown>];

    return (
        <StyledLabel htmlFor={props.name}>
            <StyledLabelText>{props.label}</StyledLabelText>
            {props.children}
            {touchedField && fieldErrors && <InputErrors errors={fieldErrors} />}
        </StyledLabel>
    )
}

export default InputWrapper