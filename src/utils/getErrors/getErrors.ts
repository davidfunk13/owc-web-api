import { ValidationError } from "class-validator";
import ErrorType from "../../types/ErrorType";


const getErrors = (errors: ValidationError[]) => {
    const res = []

    function extractValues(constraints: { [key: string]: string }) {

        let values = [];

        for (const [_, value] of Object.entries(constraints)) {
            values.push(value);
        }

        return values;
    }

    if (!errors.length) {
        res.push({ errors })
        return res;
    }

    errors.map(error => {
        res.push({
            value: error.value, property: error.property, constraints: extractValues(error.constraints)
        })
    })

    return res;
};

export default getErrors
