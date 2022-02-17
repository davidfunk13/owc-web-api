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
            return res.json({ message: "Session not found." })
        }

        res.json(session);
    }

    async save(req: Request, res: Response, next: NextFunction) {
        let { battletagId, ...sessionInput } = req.body;

        const battletagRepo = getRepository(Battletag);
        const sessionRepo = getRepository(Session);

        const errors = await validateSession(sessionInput);

        if (errors.length) {
            const trimmedErrors = getErrors(errors);
            return res.json({ message: "Failed to save session.", errors: trimmedErrors })
        }

        const session = new Session();

        Object.assign(session, sessionInput)

        const battletag = await battletagRepo.findOne(battletagId);

        if (!battletag) {
            return res.json({ error: "Battletag not found." });
        }

        session.battletag = battletag;

        const result = await sessionRepo.save(session)

        res.json(result);
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