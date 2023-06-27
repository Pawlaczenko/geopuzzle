import { FC, useRef, useEffect } from 'react';
import styled from 'styled-components'
import { FiX } from "react-icons/fi";
import Heading from './Heading';
import { useDetectOutside } from 'src/hooks/useDetectOutside';
import { myScrollBar } from 'src/styles/mixins';

interface IModalProps {
    shouldShow: boolean,
    handleClose: ()=>void,
    children: React.ReactNode,
    title: string
}

const Modal : FC<IModalProps> = ({shouldShow, handleClose, children, title}) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    useDetectOutside(modalRef,handleClose);

    useEffect(() => {
        modalRef.current?.close();
        if(shouldShow) {
            modalRef.current?.showModal();
            document.body.classList.add("modal-open");
        } else {
            modalRef.current?.close();
            document.body.classList.remove("modal-open");
        }
    },[shouldShow]);

    return (
        <StyledModal ref={modalRef}>
            <ModalBar>
                <Heading level='h4'>{title}</Heading>
                <CloseButton onClick={handleClose} type='button'><FiX /></CloseButton>
            </ModalBar>
            {children}
        </StyledModal>
    );
}

const StyledModal = styled.dialog`
    min-width: 40vw;
    max-width: 80vw;
    margin: auto;
    inset: 0;
    padding: 3rem;
    padding-left: 4rem;

    border: var(--border-thin);
    border-radius: 1.5rem;
    background: ${({theme}) => theme.header};

    &::backdrop {
        background: rgba(0, 0, 0, 0.25);
    }

    ${myScrollBar};
`;

const ModalBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
`

const CloseButton = styled.button`
    --button-size: 3.5rem;
    width: var(--button-size);
    height: var(--button-size);
    padding: .5rem;
    align-self: flex-start;
    margin-left: auto;
    border-radius: .5rem;

    cursor: pointer;

    & > svg {
        width: 100%;
        height: 100%;
    }

    &:hover {
        background-color: var(--color-grey);
    }
`

export default Modal