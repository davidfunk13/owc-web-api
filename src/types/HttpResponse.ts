interface HttpResponse{
    status: 200 | 204 
    message: string
    data?: unknown
}

export default HttpResponse;