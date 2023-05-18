import { FC } from 'react'
import { flexContainer } from 'src/styles/mixins';
import styled from 'styled-components'

export interface IInputProps {
    placeholder: string,
    label: string,
    required: boolean,
    name: string,
    type?: React.HTMLInputTypeAttribute | 'textarea'
}

const Input : FC<IInputProps> = (props) => {
    const element = props.type === 'textarea' ? 'textarea' : 'input';
    const type = props.type ? props.type==='textarea' ? undefined : props.type : 'text';
    return (
        <StyledLabel>
            <StyledLabelText>{props.label} {props.required && "*"}</StyledLabelText>
            <StyledInput as={element} type={type} name={props.name} placeholder={props.placeholder} required={props.required} />
        </StyledLabel>
    )
}

const StyledLabel = styled.label`
    ${flexContainer('center','center','column')};
    --input-width: min(50ch,100%);
    gap: 1rem;
    max-width: var(--input-width);
    margin-bottom: 2rem;
`

const StyledInput = styled.input`
    font-size: var(--fs-h6);
    font-family: var(--family-primary);
    
    background: var(--color-grey-light);
    box-shadow: 0 .3rem var(--color-secondary);
    border: none;
    border-radius: var(--radius);

    --input-height: 5.2rem;

    height: var(--input-height);
    width: 100%;
    padding: 0 5rem;

    &:focus,
    &:active {
        outline: .2rem solid var(--color-secondary);
    }

    &:is(textarea) {
        resize: vertical;
        padding-top: 2rem;
        min-height: calc(4 * var(--input-height));
    }
`;

const StyledLabelText = styled.span`
    font-weight: bold;
    font-family: var(--family-primary);
`


export default Input