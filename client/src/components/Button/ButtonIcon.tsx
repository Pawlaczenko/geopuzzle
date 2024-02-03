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
    disabled?: boolean,
    onClick?: ()=>void
}

const ButtonIcon : FC<IButtonIconProps> = (props) => {
    const Icon = ICONS.get(props.icon);
    let disabled : boolean = props.disabled ?? false;
    return (
        <StyledButtonIcon onClick={props.onClick} variant={props.btnType} type={props.type} disabled={disabled}>
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
        flex-shrink: 0;
    }
`;

export default ButtonIcon