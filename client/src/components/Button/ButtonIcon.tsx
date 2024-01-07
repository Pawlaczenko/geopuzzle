import { FC } from 'react'
import styled from 'styled-components'
import Button from './Button.styled';
import { ButtonType } from './Button.styled';
import { flexContainer } from 'src/styles/mixins';
import { ICONS, IconName } from 'src/data/icons.data';

interface IButtonIconProps {
    btnType: ButtonType,
    children: React.ReactNode,
    icon: IconName,
    type?: "submit" | "button" | "reset",
    onClick?: ()=>void
}

const ButtonIcon : FC<IButtonIconProps> = (props) => {
    const Icon = ICONS.get(props.icon);
    return (
        <StyledButtonIcon onClick={props.onClick} variant={props.btnType} type={props.type}>
            {Icon && <Icon />}
            {props.children}
        </StyledButtonIcon>
    )
}

const StyledButtonIcon = styled(Button)`
    ${flexContainer('space-between','center')};
    gap: 1.5rem;

    & > svg {
        fill: var(--button-border-color);
        width: 2.5rem;
        height: 2.5rem;
    }
`;

export default ButtonIcon