import { getManager } from "typeorm";
import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";
import { Session } from "../../entity/Session/Session";
import { validate } from "class-validator";
import validateSession from "../../validation/Session/validateSession";
import getErrors from "../../utils/getErrors/getErrors";

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
       const input = request.body;

       const sessionRepository = getRepository(Session);

        const errors = await validateSession(input);
        
        
        if (errors.length) {
            const trimmedErrors = getErrors(errors);
            return response.json({ message: "Failed to save session.", errors: trimmedErrors })
        }

        const session = await sessionRepository.create(input);
        const result = await sessionRepository.save(session);

        response.json(result)
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