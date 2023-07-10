import { ChangeEvent, FC, useState, useRef } from 'react';
import styled from 'styled-components'
import InputImage from 'src/assets/image-placeholder.svg';
import Button from '../Button/Button.styled';
import { StyledInput } from './Input.styled';
import InputWrapper from './InputWrapper';
import { useFormikContext } from 'formik';
import { IInputProps } from 'src/types/input.types';

const FileInput : FC<IInputProps> = (props) => {
    const {setFieldValue} = useFormikContext();
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
                <StyledImage as="figure" $selectedImg={selectedFile || undefined} />
                {selectedFile && <Button type="button" $btnType='white' onClick={removePhoto}>X</Button>}
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
        top: -1rem;
        left: -1rem;
    }
`;

export const StyledImage = styled(StyledInput)<{$selectedImg?: string}>`
    background:
        ${({$selectedImg: selectedImg}) => {
            if(selectedImg){
                return `url(${selectedImg}) center/cover no-repeat` //show selected image
            } else {
                return `url(${InputImage}) bottom right/65% no-repeat` //show default image
            }
        }},
        ${({theme}) => theme.input};
    width: 100%;
    aspect-ratio: 1.65/1;
`

export default FileInput