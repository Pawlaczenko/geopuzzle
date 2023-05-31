import { FC } from 'react'
import styled from 'styled-components'
import { StyledInput } from './Input.styled';
import { IInputProps } from './IInputProps.interface';
import InputWrapper from './InputWrapper';

interface ITextInputProps extends IInputProps {
    placeholder?: string,
    type?: React.HTMLInputTypeAttribute,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

const TextInput : FC<ITextInputProps> = (props) => {
    return (
        <InputWrapper label={props.label} required={props.required} errors={props.errors} name={props.name}>
            <StyledTextInput
                value={props.value}
                onChange={props.handleChange}
                onBlur={()=>{props.handleBlur(props.name,props.value)}}
                type={props.type || 'text'} 
                name={props.name} 
                placeholder={props.placeholder}
                required={props.required}
                id={props.name}
                $error={props.errors && props.errors.length > 0} />
        </InputWrapper>
    )
}

const StyledTextInput = styled(StyledInput)`
    height: var(--input-height);
`;


export default TextInput