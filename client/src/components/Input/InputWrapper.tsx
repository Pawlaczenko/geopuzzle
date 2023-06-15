import { FC } from 'react'
import { StyledLabel, StyledLabelText } from './Input.styled';
import InputErrors from './InputErrors';
import { useFormikContext } from 'formik';
import { TrackInfoFormValues } from 'src/components/TrackInfoForm/TrackInfoForm';
import { TRACK_INFO_CONSTRAINTS } from '../TrackInfoForm/TrackInfoForm.helper';

interface IInputWrapperProps {
    label: string,
    name: string,
    children: React.ReactNode,
}

const InputWrapper : FC<IInputWrapperProps> = (props) => {
    const {errors, touched} = useFormikContext<TrackInfoFormValues>();
    const fieldErrors : string | undefined = errors[props.name as keyof TrackInfoFormValues];
    const touchedField : boolean | undefined = touched[props.name as keyof TrackInfoFormValues];
    const isRequired : boolean = TRACK_INFO_CONSTRAINTS.requiredFields[props.name as keyof TrackInfoFormValues];

    return (
        <StyledLabel htmlFor={props.name}>
            <StyledLabelText>{props.label}{isRequired && '*'}</StyledLabelText>
            {props.children}
            {touchedField && fieldErrors && <InputErrors errors={fieldErrors} />}
        </StyledLabel>
    )
}

export default InputWrapper