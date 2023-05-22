import { ChangeEvent, FC, useState, useRef } from 'react';
import styled from 'styled-components'
import InputImage from 'src/assets/back-waves.svg';
import { flexContainer } from 'src/styles/mixins';
import Button from '../Button/Button.styled';
import { StyledInput } from './Input.styled';
import { IInputProps } from './IInputProps.interface';

const FileInput : FC<IInputProps> = (props) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if(file) {
            setSelectedFile(URL.createObjectURL(file));
        }
    };

    const removePhoto = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setSelectedFile(null);
        if(inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <StyledFileInput as="label" htmlFor={props.name} selectedImg={selectedFile || undefined}>
            <input type='file' id={props.name} name={props.name} required={props.required} accept="image/png, image/jpeg" onChange={handleFileChange} ref={inputRef} />
            {!selectedFile && props.label}
            {selectedFile && <Button btnType='yellow' onClick={removePhoto}>Remove Photo</Button>}
        </StyledFileInput>
    )
}

const StyledFileInput = styled(StyledInput)<{selectedImg?: string}>`
    background:
        ${({selectedImg}) => {
            if(selectedImg){
                return `url(${selectedImg}) center/cover no-repeat`
            } else {
                return `url(${InputImage}) bottom/contain no-repeat`
            }
        }}, 
        var(--color-grey-light);
    aspect-ratio: 1.65/1;
    position: relative;
    ${flexContainer('center','center')};
    cursor: pointer;
    color: var(--color-dark);

    & > input[type="file"] {
        display: none;
    }

    & > button {
        position: absolute;
        bottom: -10%;
    }
`;

export default FileInput