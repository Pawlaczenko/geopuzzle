import { StyledImage } from "src/components/Input/FileInput"

export const getImageFromObject = (image?: Blob|null,message="Brak obrazu") => {
    return (image !== undefined && image !== null)
    ? <StyledImage as="div" $selectedImg={URL.createObjectURL(image)} />
    : message
}