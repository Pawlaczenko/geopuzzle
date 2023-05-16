import { FC } from 'react'
import { useThemeContext } from 'src/context/ThemeContext';
import { createCircle, flexContainer } from 'src/styles/mixins';
import { Themes } from 'src/styles/theme';
import styled from 'styled-components'

const ToggleThemeButton : FC = () => {
    const {themeName, toggleTheme} = useThemeContext();
    const isDarkTheme = themeName === Themes.dark;

    return (
        <StyledToggleThemeButton isChecked={isDarkTheme} onClick={toggleTheme}>
            <Toggler />
        </StyledToggleThemeButton>
    )
}

const StyledToggleThemeButton = styled.button<{isChecked: boolean}>`
    background-color: var(--color-grey);
    border-radius: var(--radius);
    padding: .2rem .5rem;
    cursor: pointer;
    width: 6rem;
    
    ${(props) => flexContainer(props.isChecked ? 'flex-end' : 'flex-start')}
`;

const Toggler = styled.div`
    background: var(--color-secondary);
    ${createCircle('2rem')};
`


export default ToggleThemeButton