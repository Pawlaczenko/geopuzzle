import { ChangeEvent, FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components'
import PhotoIcon from 'src/assets/icons/add-photo.svg';
import Button from '../Button/Button.styled';
import { StyledInput } from './Input.styled';
import InputWrapper from './InputWrapper';
import { useFormikContext } from 'formik';
import { IInputProps } from 'src/types/input.types';

const FileInput : FC<IInputProps> = (props) => {
    const {setFieldValue,getFieldProps} = useFormikContext();
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        const file = getFieldProps(props.name).value;
        if(file){
            setSelectedFile(URL.createObjectURL(file));
        }
    },[]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if(file) {
            setSelectedFile(URL.createObjectURL(file));
            setFieldValue(props.name,file);
        }
    };

    const removePhoto = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setSelectedFile(null);
        setFieldValue(props.name,undefined);
        if(inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <InputWrapper label={props.label} name={props.name}>
            <StyledFileWrapper>
                <StyledImage as="figure" $selectedImg={selectedFile || undefined} placeholder={PhotoIcon} />
                {selectedFile && <Button type="button" variant='regular' onClick={removePhoto}>X</Button>}
                <input
                    type='file'
                    id={props.name} 
                    accept="image/png, image/jpeg"
                    name={props.name}
                    onChange={handleFileChange}
                    ref={inputRef} />
            </StyledFileWrapper>
        </InputWrapper>
    )
}

const StyledFileWrapper = styled.div`
    position: relative;
    cursor: pointer;
    color: var(--color-dark);
    width: 100%;

    & > input[type="file"] {
        display: none;
    }

    & > button {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
`;

export const StyledImage = styled(StyledInput)<{$selectedImg?: string, placeholder: string}>`
    background:
        ${({$selectedImg: selectedImg, placeholder}) => {
            if(selectedImg){
                return `url(${selectedImg}) center/cover no-repeat` //show selected image
            } else {
                return `url(${placeholder}) center/10% no-repeat`
            }
        }};
    width: 100%;
    aspect-ratio: 1.65/1;
    border: 2px dashed ${({theme}) => theme.primary};
`

export default FileInput