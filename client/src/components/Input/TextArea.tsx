import { FC } from 'react'
import styled from 'styled-components'
import { StyledInput} from './Input.styled';
import InputWrapper from './InputWrapper';
import { useFormikContext } from 'formik';
import { IInputProps } from './IInputProps.interface';

const TextArea : FC<IInputProps> = (props) => {
    const {getFieldProps} = useFormikContext();
    return (
        <InputWrapper label={props.label} name={props.name}>
            <StyledTextArea
                as='textarea' 
                placeholder={props.placeholder}
                id={props.name}
                {...getFieldProps(props.name)}/>
        </InputWrapper>
    )
}

const StyledTextArea = styled(StyledInput)`
    resize: vertical;
    padding-top: 2rem;
    min-height: calc(4 * var(--input-height));
`;


export default TextArea