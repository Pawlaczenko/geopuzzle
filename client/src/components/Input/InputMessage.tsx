import { FC } from 'react'
import { flexContainer } from 'src/styles/mixins';
import styled from 'styled-components'
import { MdHelpOutline, MdOutlineError } from 'react-icons/md';

type inputMessageType = 'info' | 'error';

interface IInputMessageProps {
    message: string,
    type: inputMessageType,
}

const InputMessage : FC<IInputMessageProps> = ({message,type}) => {
    return (
        <StyledInputMessage type={type}>
            {type === 'error' ? <MdOutlineError /> : <MdHelpOutline />}
            {message}
        </StyledInputMessage>
    )
}

const StyledInputMessage = styled.span<{type: inputMessageType}>`
    color: ${(props) => props.type === 'error' ? 'var(--color-error)' : 'var(--color-primary)'};
    ${flexContainer('flex-start','center')};
    gap: 1rem;
    & > svg {
        width: 2rem;
        height: 2rem;
        flex-shrink: 0;
    }
    margin-top: .5rem;   
`;


export default InputMessage