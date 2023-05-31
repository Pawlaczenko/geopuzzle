import { FC, FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Form } from 'react-router-dom';
import ButtonIcon from 'src/components/Button/ButtonIcon';
import FileInput from 'src/components/Input/FileInput';
import TagsInput from 'src/components/Input/TagsInput/TagsInput';
import TextArea from 'src/components/Input/TextArea';
import TextInput from 'src/components/Input/TextInput';
import { updateTrackInfo } from 'src/features/trackCreator/trackCreatorSlice';
import { toBase64 } from 'src/helpers/toBase64.helper';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const InfoFormLabels = {
    track_name: "track_name",
    track_description: "track_description",
    track_thumbnail: "track_thumbnail",
    track_tags: "track_tags"
}

const initialFormState : IFormState = {
    track_name: '',
    track_description: '',
    track_tags: []
}

export interface IFormState {
    track_name: string,
    track_description: string,
    track_thumbnail?: File | string,
    track_tags: string[]
}

interface IFormErrors {
    track_name?: string[],
    track_description?: string[],
    track_thumbnail?: string[],
    track_tags?: string[]
}

const initialFormErrors : IFormErrors = {
    track_description: [],
    track_name: [],
    track_tags: [],
    track_thumbnail: []
}

const CreateTrackForm : FC = () => {
    const [formErrors, setFormErrors] = useState<IFormErrors>(initialFormErrors);
    const [formState, setFormState] = useState<IFormState>(initialFormState);
    const formRef = useRef<HTMLFormElement>(null);
    const dispatch = useDispatch();

    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleFileInputChange = (value: File | undefined) => {
        setFormState((prevState) => ({ ...prevState, track_thumbnail: value }));
    }

    const handleTagsInputChange = (value: string[]) => {
        setFormState((prevState) => ({ ...prevState, track_tags: value }));
    }

    const handleErrorChange = (errors:string[], fieldName: string) => {
        setFormErrors((prevState) => ({ ...prevState, [fieldName]: errors }));
    };

    const validateText = (fieldName: string, value: string) : boolean => {
        const text = value.trim();
        const errors : string[] = [];
        const maxNumber = fieldName === InfoFormLabels.track_description ? 500 : 30;

        if(!text || text.length === 0){
            errors.push("To pole jest obowiązkowe");
        }
        if(text.length > maxNumber){
            errors.push(`Maksymalna długość: ${maxNumber} znaków.`);
        }

        handleErrorChange(errors,fieldName);

        return errors.length === 0;
    }

    const validateTags = () : boolean => {
        const tags = formState.track_tags;
        const errors : string[] = [];
        if(!tags || tags.length === 0){
            errors.push("Przynajmniej 1 tag jest obowiązkowy.");
        }
        if(tags.length > 5){
            errors.push("Maksymalna ilość tagów: 5.");
        }
        handleErrorChange(errors,InfoFormLabels.track_tags);

        return errors.length === 0;
    }

    const validateThumbnail = () : boolean => {
        const thumbnail = formState.track_thumbnail;
        const errors : string[] = [];
        const maxAllowedSize = 5 * 1024 * 1024;

        if(thumbnail && (thumbnail instanceof  File)){
            if(thumbnail.size > maxAllowedSize){
                errors.push("Plik jest za duży. Maksymalny rozmiar pliku: 5MB");
            }
            if(!/(\.jpg|\.jpeg|\.png)$/i.exec(thumbnail.name)){
                errors.push("Zły tym pliku. Akceptowalne typy: .png, .jpg, .jpeg");
            }
        }

        handleErrorChange(errors,InfoFormLabels.track_thumbnail);

        return errors.length === 0;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nameValidation = validateText(InfoFormLabels.track_name,formState.track_name);
        const descValidation = validateText(InfoFormLabels.track_description,formState.track_description);
        const tagsValidation= validateTags();
        const thumbnailValidation= validateThumbnail();

        if(
        nameValidation &&
        descValidation && 
        tagsValidation &&
        thumbnailValidation &&
        formRef.current)
        {
            const convertedThumbnail = (formState.track_thumbnail && formState.track_thumbnail instanceof File) ? await toBase64(formState.track_thumbnail) : undefined;
            const readyObject : IFormState = {
                track_name: formState.track_name,
                track_description: formState.track_description,
                track_tags: formState.track_tags,
                track_thumbnail: convertedThumbnail as string | undefined,
            }
            dispatch(updateTrackInfo(readyObject));
            // formRef.current.submit();
        }
    }

    return (
            <StyledForm method="POST" onSubmit={handleSubmit} ref={formRef}>
                <TextInput 
                    handleChange={handleTextInputChange} 
                    value={formState.track_name} 
                    label='Nazwa Trasy' 
                    name={InfoFormLabels.track_name} 
                    placeholder='Podaj nazwę trasy' 
                    errors={formErrors.track_name}
                    handleBlur={validateText}
                    required />
                <TextArea 
                    handleChange={handleTextInputChange} 
                    value={formState.track_description} 
                    label='Opis Trasy' 
                    name={InfoFormLabels.track_description} 
                    placeholder='Dodaj opis trasy'
                    errors={formErrors.track_description}
                    handleBlur={validateText}
                    required />
                <FileInput 
                    handleChange={handleFileInputChange}  
                    name={InfoFormLabels.track_thumbnail}
                    errors={formErrors.track_thumbnail}
                    handleBlur={validateThumbnail}
                    label='Miniatura Trasy' />
                <TagsInput
                    handleChange={handleTagsInputChange} 
                    value={formState.track_tags.join(" ")} 
                    label='Tagi' 
                    name={InfoFormLabels.track_tags}
                    handleBlur={validateTags}
                    errors={formErrors.track_tags} 
                    placeholder='Dodaj tagi' />
                <ButtonIcon btnType='white' icon='create'>Następny krok</ButtonIcon>
            </StyledForm>
    )
}

const StyledForm = styled(Form)`
    grid-area: form;
    ${flexContainer('flex-start','center','column')}
    gap: 2rem;
    min-width: 0;
    
    @media only screen and (${BREAKPOINTS.phone}){
        & > button {
            margin-top: 5rem;
        }
    }
`

export default CreateTrackForm