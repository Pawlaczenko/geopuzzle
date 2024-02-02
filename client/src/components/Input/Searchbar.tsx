import { FC, useState } from 'react'
import styled from 'styled-components'
import { StyledInput } from './Input.styled';
import { IInputProps } from 'src/types/input.types';
import { ICONS, IconName } from 'src/data/icons.data';
import { BREAKPOINTS } from 'src/styles/variables';

const TextInput : FC<IInputProps> = (props) => {
    const SearchIcon = ICONS.get('explore');
    const [isSearchDisabled, disableSearch] = useState<boolean>(true);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim();
        if(value && value.length > 0) {
            disableSearch(false);
        } else {
            disableSearch(true);
        }
    }

    return (
        <StyledSearchbar>
            <StyledTextInput
                onInput={handleInput}
                type={props.type || 'text'} 
                placeholder={props.placeholder}
                id={props.name}/>
            <SearchButton disabled={isSearchDisabled}>
                {SearchIcon && <SearchIcon />}
            </SearchButton>
        </StyledSearchbar>
    )
}

export const StyledSearchbar = styled.form`
    position: relative;
`;

const StyledTextInput = styled(StyledInput)`
    height: var(--input-height);
    width: 100%;
`;

const SearchButton = styled.button`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    cursor: pointer;

    svg {
        width: 100%;
        height: 100%;
    }

    &:not(:disabled):hover {
        svg {
            color: var(--color-primary);
        }
    }
`

export default TextInput