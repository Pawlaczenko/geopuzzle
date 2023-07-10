import { FC, useState, ChangeEvent, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { StyledInput} from '../Input.styled';
import { flexContainer } from 'src/styles/mixins';
import InputWrapper from '../InputWrapper';
import { useFormikContext } from 'formik';
import { IInputProps } from 'src/types/input.types';
import TagItem from 'src/components/TagNames/TagItem';

const TagsInput : FC<IInputProps> = (props) => {
    const [tags, setTags] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const {getFieldProps, setFieldValue} = useFormikContext();
    
    useEffect(() => {
        if(inputRef && inputRef.current){
            setFieldValue(props.name, tags.join(" "));
        }
    },[tags]);

    const deleteTag = (incomingTag:string) => {
        const filteredArray = tags.filter(tag => tag!=incomingTag);
        setTags(filteredArray);
    }

    const checkIfTagExists = (incomingTag: string) => {
        return tags.some(tag => tag === incomingTag);
    }

    const formatIncomingTag = (incomingTag: string) : string => {
        let tag : string = incomingTag.toLowerCase().trim();
        tag = tag.replaceAll('_','-').replaceAll(',','').replaceAll(' ','').replace(/^[-_]+|[-_]+$/g, '');
        return tag;
    }

    const addTag = (incomingTag: string) => {
        const tag = formatIncomingTag(incomingTag);
        if(!checkIfTagExists(tag) && tag.length > 0) {
            setTags([...tags,tag]);
        }
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        switch(event.key){
            case 'Backspace': {
                if(target.value.length === 0 && tags.length > 0) {
                    event.preventDefault();
                    const lastTag = tags[tags.length-1];
                    target.value = lastTag;
                    deleteTag(lastTag);
                    break;
                }
            }
        }
    }

    const handleOnChange = (event : ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        switch(value[value.length-1]){
            case ',':
            case ' ':
                addTag(value);
                event.target.value = "";
                break;
        }
    }

    const handleOnBlur = (event : ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        addTag(value);
        event.target.value = "";  
    }

    return (
        <InputWrapper label={props.label} name={props.name}>
            <input ref={inputRef} style={{display: 'none'}} {...getFieldProps(props.name)} />
            <TagsInputWrapper as='div'>
                <TagsWrapper>
                    {
                        tags.map((tag,index) => <TagItem tag={tag} id={index} key={tag} handleClick={deleteTag} />)
                    }
                    <StyledTagsInput
                        placeholder={props.placeholder}
                        id={props.name}
                        onBlur={handleOnBlur}
                        onKeyDown={handleKeyUp}
                        onChange={handleOnChange}/>
                </TagsWrapper>
            </TagsInputWrapper>
        </InputWrapper>
    )
}

const TagsInputWrapper = styled(StyledInput)`
    min-height: var(--input-height);
    padding-top: 1rem;
    padding-bottom: 1rem;
    cursor: text;
    
`

const StyledTagsInput = styled.input`
    background: none;
    border: none;
    padding: 0;
    flex: 1;

    &:focus{
        outline: none;
    }
`;

const TagsWrapper = styled.div`
    line-height: 2;
    ${flexContainer('flex-start','center')}
    flex-wrap: wrap;
    gap: 1rem;
    overflow: hidden;
`

export default TagsInput