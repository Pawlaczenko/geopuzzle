import * as Yup from 'yup';
export const getExtension = (filename?: string) : string | undefined => {
    if(!filename) return undefined;
    return filename.split('.').pop();
}

export const inMB = (bytes: number) => bytes * 1024 * 1024;
export const validImageExt = ['png', 'jpg', 'JPG', 'jpeg', 'webp'];

export const textValidation = (length: number, label: string, isRequired = true) => {
    const y = Yup.string()
        .transform((value, originalValue) => originalValue.trim())
        .max(length, `${label} nie może przekraczać ${length} znaków.`);
    
    return isRequired ? y.required(`${label} to wymagane pole`) : y;
}

export const imageValidation = (imageSize: number) => {
    return Yup.mixed()
        .test({
            message: `Akceptowalne rozszerzenia plików: ${validImageExt.join(", ")} `,
            test: (file, context) => {
                const ext = file ? getExtension((file as File).name) : undefined;
                const isValid = ext ? validImageExt.includes(ext) : true;
                if (!isValid) context?.createError();
                return isValid;
            }
        })
        .test({
            message: `Plik jest za duży. Maksymalny rozmiar wynosi: ${imageSize / 1024 / 1024}`,
            test: (file) => {
                if(file){
                    return (file as File).size < imageSize;
                }
                return true;
            }
        })
}