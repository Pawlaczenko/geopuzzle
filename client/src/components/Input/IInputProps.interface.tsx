export interface IInputProps {
    label: string,
    required?: boolean,
    name: string,
    errors?: string[],
    value?: string,
    handleBlur: (...args: any[]) => boolean

}