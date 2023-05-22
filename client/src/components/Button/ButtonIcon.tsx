import { FC } from 'react'
import styled from 'styled-components'
import Button from './Button.styled';
import { ButtonType } from './Button.styled';
import { flexContainer } from 'src/styles/mixins';
import { ICONS, IconName } from 'src/data/icons';

interface IButtonIconProps {
    btnType: ButtonType,
    children: React.ReactNode,
    icon: IconName
}

const ButtonIcon : FC<IButtonIconProps> = (props) => {
    const Icon = ICONS.get(props.icon);
    return (
        <StyledButtonIcon btnType={props.btnType} >
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
        width: 3rem;
        height: 3rem;
    }
`;

export default ButtonIcon