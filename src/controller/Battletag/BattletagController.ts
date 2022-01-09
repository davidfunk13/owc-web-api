import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";

export class BattletagController {
    async oneById(request: Request, response: Response, next: NextFunction) {
        const battletagRepository = getRepository(Battletag);

        const oneBattletag = await battletagRepository.findOne(request.params.id);

        if (!oneBattletag) {
            response.json({ message: "Battletag not found." })
        }

        response.json(oneBattletag);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const battletagRepository = getRepository(Battletag);

        const newBattletag = await battletagRepository.save(request.body);

        response.json(newBattletag)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const battletagRepository = getRepository(Battletag);

        let battletagToRemove = await battletagRepository.findOne(request.params.id);

        if (!battletagToRemove) {
            response.json({
                message:
                    "Battletag not found."
            });
        }

        const removed = await battletagRepository.remove(battletagToRemove);

        response.json(removed)
    }

}