import { ChangeEvent, FC, useState, useRef } from 'react';
import styled from 'styled-components'
import InputImage from 'src/assets/image-placeholder.svg';
import Button from '../Button/Button.styled';
import { StyledInput } from './Input.styled';
import { IInputProps } from './IInputProps.interface';
import InputWrapper from './InputWrapper';

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
        <InputWrapper label={props.label} required={props.required} errors={props.errors} name={props.name}>
            <StyledFileWrapper>
                <StyledImage as="figure" selectedImg={selectedFile || undefined} $error={props.errors.length > 0} />
                <input type='file' id={props.name} name={props.name} required={props.required} accept="image/png, image/jpeg" onChange={handleFileChange} ref={inputRef} />
                {selectedFile && <Button btnType='yellow' onClick={removePhoto}>Remove Photo</Button>}
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
        bottom: 0;
        right: 0;
    }
`;

const StyledImage = styled(StyledInput)<{selectedImg?: string}>`
    background:
        ${({selectedImg}) => {
            if(selectedImg){
                return `url(${selectedImg}) center/cover no-repeat` //show selected image
            } else {
                return `url(${InputImage}) center/cover no-repeat` //show default image
            }
        }}, 
        var(--color-grey-light);
    width: 100%;
    aspect-ratio: 1.65/1;
`

export default FileInput