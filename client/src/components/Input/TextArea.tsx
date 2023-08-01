import { FC } from 'react'
import styled from 'styled-components'
import { StyledInput} from './Input.styled';
import InputWrapper from './InputWrapper';
import { useFormikContext } from 'formik';
import { IInputProps } from 'src/types/input.types';

const TextArea : FC<IInputProps> = (props) => {
    const {getFieldProps} = useFormikContext();
    return (
        <InputWrapper label={props.label} name={props.name} helpMessage={props.helpMessage}>
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
    line-height: 1.5;
`;


export default TextArea