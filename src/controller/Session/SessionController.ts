import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";
import { Session } from "../../entity/Session/Session";
import validateSession from "../../validation/Session/validateSession";
import getErrors from "../../utils/getErrors/getErrors";

export class SessionController {
    async oneById(req: Request, res: Response, next: NextFunction) {
        const session = await getRepository(Session).findOne(req.params.id);

        if (!session) {
            return res.status(404).json({ message: "Session not found." })
        }

        return res.status(200).json({ message: "Session found.", data: session });
    }

    async save(req: Request, res: Response, next: NextFunction) {
        let { battletagId, ...sessionInput } = req.body;

        const battletagRepo = getRepository(Battletag);

        const sessionRepo = getRepository(Session);

        const session = new Session();

        Object.assign(session, sessionInput)

        const battletag = await battletagRepo.findOne({ id: battletagId });

        if (!battletag) {
            return res.json({ error: "Battletag not found." });
        }

        session.tankSrStart = +session.tankSrStart;
        session.tankSrCurrent = +session.tankSrCurrent;
        session.damageSrStart = +session.damageSrStart;
        session.damageSrCurrent = +session.damageSrCurrent;
        session.supportSrStart = +session.supportSrStart;
        session.supportSrCurrent = +session.supportSrCurrent;
        session.battletag = battletag;

        try {
            const result = await sessionRepo.save(session)
            return res.status(200).json({ message: "Session successfully saved to battletag.", data: result })
        } catch (err) {
            const errors = getErrors(err);

            return res.status(422).json({ message: "There was a problem saving this session", errors })
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const sessionRepo = getRepository(Session);
        let session = await sessionRepo.findOne(req.params.id);

        if (!session) {
            return res.json({ message: "Session not found." });
        }

        const result = await sessionRepo.remove(session);

        res.json(result)
    }
}