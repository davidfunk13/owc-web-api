import { validate } from "class-validator";
import { Battletag } from "../../entity/Battletag/Battletag";


const validateBattletag = async(input: Battletag) => {
    let battletag = new Battletag();

    const {
        id,
        name,
        urlName,
        level,
        playerLevel,
        isPublic,
        platform,
        portrait,
        sessions,
    } = input as Battletag

    // session.tankSrStart = +tankSrStart;
    // session.tankSrCurrent = +tankSrCurrent;
    // session.damageSrStart = +damageSrStart;
    // session.damageSrCurrent = +damageSrCurrent;
    // session.supportSrStart = +supportSrStart;
    // session.supportSrCurrent = +supportSrCurrent;


    return await validate(battletag);
}

export default validateBattletag