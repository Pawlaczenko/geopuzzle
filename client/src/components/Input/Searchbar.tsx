import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router
import { useLocation } from 'react-router-dom';
import { StyledInput } from './Input.styled';
import { IInputProps } from 'src/types/input.types';
import { BREAKPOINTS } from 'src/styles/variables';
import { ICONS } from 'src/data/icons.data';

const TextInput : FC<IInputProps> = (props) => {
    const SearchIcon = ICONS.get('explore');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate(); // Get history object from React Router
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('search') || "";
        setSearchQuery(q);
    },[]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim();
        setSearchQuery(value);
    }

    const handleSearch = () => {
        navigate(`/track?search=${encodeURIComponent(searchQuery)}`); // Navigate to '/track' with search query
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
    };

    return (
        <StyledSearchbar onSubmit={handleSubmit}>
            <StyledTextInput
                value={searchQuery}
                onChange={handleInput}
                type={props.type || 'text'} 
                placeholder={props.placeholder}
                id={props.name}/>
            <SearchButton onClick={handleSearch}>
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