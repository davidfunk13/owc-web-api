import { validate } from "class-validator";
import { Battletag } from "../../entity/Battletag/Battletag";


const validateBattletag = async (input: Battletag) => {
    return await validate(input);
}

export default validateBattletag