import { FC } from 'react'
import { StyledLabel, StyledLabelText } from './Input.styled';
import InputErrors from './InputErrors';
import { useFormikContext } from 'formik';
import { FormValues } from 'src/components/CreateTrackForm/CreateTrackForm';
import { TRACK_INFO_CONSTRAINTS } from '../CreateTrackForm/CreateTrackForm.helper';

interface IInputWrapperProps {
    label: string,
    name: string,
    children: React.ReactNode,
}

const InputWrapper : FC<IInputWrapperProps> = (props) => {
    const {errors, touched} = useFormikContext<FormValues>();
    const fieldErrors : string | undefined = errors[props.name as keyof FormValues];
    const touchedField : boolean | undefined = touched[props.name as keyof FormValues];
    const isRequired : boolean = TRACK_INFO_CONSTRAINTS.requiredFields[props.name as keyof FormValues];

    return (
        <StyledLabel htmlFor={props.name}>
            <StyledLabelText>{props.label}{isRequired && '*'}</StyledLabelText>
            {props.children}
            {touchedField && fieldErrors && <InputErrors errors={fieldErrors} />}
        </StyledLabel>
    )
}

export default InputWrapper