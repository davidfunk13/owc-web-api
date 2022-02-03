import ErrorType from "./ErrorType";

interface ErrorResponse {
    message: string,
    errors: ErrorType[]
}

export default ErrorResponse;