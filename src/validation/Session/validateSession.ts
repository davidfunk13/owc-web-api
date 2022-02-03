import { validate } from "class-validator";
import { Session } from "../../entity/Session/Session";

const validateSession = async(input: Session) => {
    let session = new Session();

    const {
        tankSrStart,
        tankSrCurrent,
        damageSrStart,
        damageSrCurrent,
        supportSrStart,
        supportSrCurrent,
    } = input as Session

    session.tankSrStart = +tankSrStart;
    session.tankSrCurrent = +tankSrCurrent;
    session.damageSrStart = +damageSrStart;
    session.damageSrCurrent = +damageSrCurrent;
    session.supportSrStart = +supportSrStart;
    session.supportSrCurrent = +supportSrCurrent;

    return await validate(session);;
}

export default validateSession