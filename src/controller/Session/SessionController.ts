import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";
import { Session } from "../../entity/Session/Session";

export class SessionController {
    async oneById(request: Request, response: Response, next: NextFunction) {
        const sessionRepository = getRepository(Session);

        const oneSession = await sessionRepository.findOne(request.params.id);

        if (!oneSession) {
            response.json({ message: "session not found." })
        }

        response.json(oneSession);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const sessionRepository = getRepository(Session);

        const newSession = await sessionRepository.save(request.body);

        response.json(newSession)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const sessionRepository = getRepository(Session);

        let sessionToRemove = await sessionRepository.findOne(request.params.id);

        if (!sessionToRemove) {
            response.json({
                message:
                    "Session not found."
            });
        }

        const removed = await sessionRepository.remove(sessionToRemove);

        response.json(removed)
    }
}