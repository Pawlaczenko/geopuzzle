import { FC, useEffect, useRef, useState, RefObject } from 'react';
import { StyledTextInput } from './TextInput';
import { useFormikContext } from 'formik';
import InputWrapper from './InputWrapper';
import { IInputProps, coordSuggestion } from 'src/types/input.types';
import { styled } from 'styled-components';
import { StyledInput } from './Input.styled';
import { flexContainer } from 'src/styles/mixins';
import { MdTravelExplore } from 'react-icons/md';

interface ICoordinatesInputProps extends IInputProps {
    handleChange: (query: string)=>void;
    suggestions?: coordSuggestion[];
    chosenWaypoint?: coordSuggestion;
    handleWaypointChange: (waypoint: coordSuggestion)=>void;
}

const CoordinatesInput : FC<ICoordinatesInputProps> = (props) => {
    const {setFieldValue, getFieldProps} = useFormikContext();
    const [isFocused, setIsFocused] = useState(false);
    const suggestionsRef = useRef(null);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if(e.relatedTarget !== suggestionsRef.current && e.target !== suggestionsRef.current){
            setIsFocused(false);
            getFieldProps(props.name).onBlur(e);
        }
    }

    useEffect(() => {
        if(props.chosenWaypoint !== undefined) {
            setFieldValue(props.name, props.chosenWaypoint.label);
            setTimeout(()=>{
                setIsFocused(false);
            },1);
        }
    },[props.chosenWaypoint]);

    return (
        <InputWrapper label={props.label} name={props.name}>
            <StyledIconInput as="div">
                <MdTravelExplore />
                <input
                    autoComplete="off"
                    type={props.type || 'text'}
                    placeholder={props.placeholder}
                    id={props.name}
                    {...getFieldProps(props.name)}
                    onChange={(e)=>{
                        props.handleChange(e.target.value);
                        getFieldProps(props.name).onChange(e);
                    }}
                    onFocus={()=>{setIsFocused(true)}}
                    onBlur={handleBlur}
                />
            </StyledIconInput>

            {
            props.suggestions && props.suggestions.length > 0 && isFocused && (
                <Suggestions ref={suggestionsRef} tabIndex={0}>
                    {
                        props.suggestions.map((item, index) => (
                            <li key={'suggestion-'+index} onClick={()=>{props.handleWaypointChange(item)}}>{item.label}</li>)
                        ) 
                    }
                </Suggestions>
            )
            }
        </InputWrapper>
    )
}

const StyledIconInput = styled(StyledTextInput)`
    ${flexContainer('flex-start','center')};
    gap: 1rem;

    & > input {
        border: none;
        background: transparent;
        flex: 1;
        height: 100%;

        &:focus {
            outline: none;
        }
    }

    & > svg {
        width: 2.5rem;
        height: 2.5rem;
    }
`

const Suggestions = styled.ul`
    position: absolute;
    left: 0;
    top: 105%;
    z-index: 2000;
    display: block;
    list-style-type: none;
    max-height: 20rem;
    width: 100%;
    overflow-y: scroll;
    padding: 1rem 2rem;

    background: ${({theme}) => theme.input};
    border-radius: 0 0 var(--radius) var(--radius);
    box-shadow: 0px 6px 6px -7px rgba(66, 68, 90, 1);
    border: var(--border-thin);

    & > li {
        margin-top: 1rem;
        cursor: pointer;
        padding: .4rem;
        
        &:hover {
            background: ${({theme}) => theme.textBlue};
            color: ${({theme}) => theme.body};;
        }
    }

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar{
        display: none; 
    }
`;

export default CoordinatesInput