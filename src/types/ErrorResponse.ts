import ErrorType from "./ErrorType";

interface IErrorResponse {
    message: string,
    errors: ErrorType[]
}

export default IErrorResponse;