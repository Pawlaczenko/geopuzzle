export interface IError {
    message: string,
    statusCode: number,
    status: string,
    isOperational: boolean,
    stack?: string

}