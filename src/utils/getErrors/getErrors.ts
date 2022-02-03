import { ValidationError } from "class-validator";
import ErrorType from "../../types/ErrorType";


const getErrors = (errors: ValidationError[]) => {
    const res = []
    
    errors.map(error => {
        res.push({ value: error.value, constraints: error.constraints })
    })
    
    return res;
};

export default getErrors
