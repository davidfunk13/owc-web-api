import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";
import getFilters from "../../utils/getFilters/getFilters";
import QueryFilters from "../../types/QueryFilters";
import HttpError from "../../types/HttpError";
import HttpResponse from "../../types/HttpResponse";

export class BattletagController {
    async oneById(req: Request, res: Response) {
        const battletagRepository = getRepository(Battletag);

        const filters = getFilters(req.query.with as QueryFilters)

        try {
            const battletag = await battletagRepository.findOne(req.params.id, { relations: filters });

            if (!battletag) {
                return res.status(400).json({ message: "Battletag not found." })
            }

            return res.status(200).json({ message: "Battletag Found", data: battletag })
        } catch (err) {
            return res.status(500).json(err)
        }
    }



    async save(req: Request, res: Response) {
        const battletagRepository = getRepository(Battletag);

        const battletag = new Battletag();

        Object.assign(battletag, req.body);

        const result = await battletagRepository.save(battletag);

        res.json(result)
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const battletagRepository = getRepository(Battletag);

        let battletag = await battletagRepository.findOne(req.params.id);

        if (!battletag) {
            return res.json({ message: "Battletag not found." });
        }

        const result = await battletagRepository.remove(battletag);

        res.json(result)
    }

}