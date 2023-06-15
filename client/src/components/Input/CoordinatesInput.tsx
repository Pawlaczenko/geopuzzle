import { FC, useState } from 'react'
import TextInput, { StyledTextInput } from './TextInput';
import { useFormikContext } from 'formik';
import InputWrapper from './InputWrapper';
import { IInputProps, coordSuggestion } from 'src/types/input.types';
import { styled } from 'styled-components';

interface ICoordinatesInputProps extends IInputProps {
    handleChange: (query: string)=>void;
    suggestions?: coordSuggestion[];
}

const CoordinatesInput : FC<ICoordinatesInputProps> = (props) => {
    const {setFieldValue, getFieldProps} = useFormikContext();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <InputWrapper label={props.label} name={props.name}>
            <StyledTextInput
                type={props.type || 'text'} 
                placeholder={props.placeholder}
                id={props.name}
                {...getFieldProps(props.name)}
                onChange={(e)=>{
                    props.handleChange(e.target.value);
                    getFieldProps(props.name).onChange(e);
                }}
                onFocus={()=>{setIsFocused(true)}}
                onBlur={(e)=>{
                    getFieldProps(props.name).onBlur(e);
                    setIsFocused(false)}
                }
            />
            {
            props.suggestions && props.suggestions.length > 0 && isFocused && (
                <Suggestions>
                    {
                        props.suggestions.map(item => <li>{item.label}</li>)
                    }
                </Suggestions>
            )
            }
        </InputWrapper>
    )
}

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