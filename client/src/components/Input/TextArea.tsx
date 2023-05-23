import { FC } from 'react'
import styled from 'styled-components'
import { StyledInput} from './Input.styled';
import { IInputProps } from './IInputProps.interface';
import InputWrapper from './InputWrapper';

interface ITextAreaProps extends IInputProps {
    placeholder?: string
}

const TextArea : FC<ITextAreaProps> = (props) => {
    return (
        <InputWrapper label={props.label} required={props.required} errors={props.errors} name={props.name}>
            <StyledTextArea as='textarea' name={props.name} placeholder={props.placeholder} required={props.required} id={props.name} $error={props.errors.length > 0} />
        </InputWrapper>
    )
}

const StyledTextArea = styled(StyledInput)`
    resize: vertical;
    padding-top: 2rem;
    min-height: calc(4 * var(--input-height));
`;


export default TextArea