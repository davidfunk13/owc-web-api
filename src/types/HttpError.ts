interface HttpError{
    status: 500 | 404 | 401 | 402
    message: string
}

export default HttpError;