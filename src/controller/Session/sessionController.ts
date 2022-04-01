import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";
import { Session } from "../../entity/Session/Session";
import getErrors from "../../utils/getErrors/getErrors";

export class SessionController {
    async all(req: Request, res: Response) {
        const params = req.query.battletag;

        if (!params || isNaN(+params)) {
            return res.status(422).json({ message: "Battletag Id not provided." })
        }

        const battletag = await getRepository(Battletag).findOne(+params, { relations: ["sessions"] });

        if (!battletag) {
            return res.status(404).json({ message: "Battletag not found." })
        }

        const sessions = battletag.sessions;

        if (!sessions.length) {
            return res.status(404).json({ message: "No sessions for this battletag were found.", data: sessions })
        }

        return res.status(200).json({ message: "Sessions retrieved successfully.", data: sessions })
    }

    async one(req: Request, res: Response, next: NextFunction) {
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
            return res.status(404).json({ message: "Battletag not found." });
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

    async update(req: Request, res: Response) {
        const {
            battletagId,
            id, 
            tankSrStart,
            damageSrStart,
            supportSrStart,
            ...sessionInput
         } = req.body;

        
        const sessionRepo = getRepository(Session);

        const session = await sessionRepo.findOne(id, { relations: ["battletag"] });
        
        if (!session) {
            return res.status(404).json({ message: "Session not found." });
        }

        if (session.battletag.id !== +battletagId) {
            return res.status(422).json({ message: "Something went wrong." });
        }

        Object.assign(session, sessionInput);

        session.tankSrStart = +session.tankSrStart;
        session.tankSrCurrent = +session.tankSrCurrent;
        session.damageSrStart = +session.damageSrStart;
        session.damageSrCurrent = +session.damageSrCurrent;
        session.supportSrStart = +session.supportSrStart;
        session.supportSrCurrent = +session.supportSrCurrent;
        
        try {
            const result = await sessionRepo.save(session)
            return res.status(200).json({ message: "Session successfully updated.", data: result })
        } catch (err) {
            const errors = getErrors(err);

            return res.status(422).json({ message: "There was a problem updating this session", errors })
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const params = req.params.id;

        const sessionRepo = getRepository(Session);

        if (!params || isNaN(+params)) {
            return res.status(422).json({ message: "Session id not provided." })
        }

        let session = await sessionRepo.findOne(params);

        if (!session) {
            return res.json({ message: "Session not found." });
        }

        try {
            const result = await sessionRepo.remove(session);
            return res.status(200).json({ message: "Session successfully removed.", data: result })

        } catch (err) {
            res.status(500).json({ message: "something went wrong removing this session." })
        }

    }
}