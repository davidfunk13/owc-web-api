import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";
import getFilters from "../../utils/getFilters/getFilters";
import QueryFilters from "../../types/QueryFilters";
import getErrors from "../../utils/getErrors/getErrors";
import parseBool from "../../utils/parseBool/parseBool";

export class BattletagController {
    async oneById(req: Request, res: Response) {
        const battletagRepository = getRepository(Battletag);

        const filters = getFilters(req.query.with as QueryFilters)

        try {
            const battletag = await battletagRepository.findOne(req.params.id, { relations: filters });

            if (!battletag) {
                return res.status(400).json({ message: "Battletag not found." })
            }

            return res.status(200).json({ message: "Battletag found.", data: battletag })
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    async save(req: Request, res: Response) {
        const battletagRepository = getRepository(Battletag);

        const battletag = new Battletag();

        Object.assign(battletag, req.body);

        //any additional coersion that needs to take place.
        battletag.isPublic = battletag.isPublic ? parseBool(battletag.isPublic) : undefined
        battletag.level = battletag.level ? +battletag.level : undefined        
        battletag.playerLevel = battletag.playerLevel ? +battletag.playerLevel : undefined

        try {
            const result = await battletagRepository.save(battletag);

            return res.status(200).json({message: "Battletag saved.", data: result})
        } catch (err) {
            const errors = getErrors(err);
            return res.status(500).json({ message: "Something went wrong inserting this battletag.", errors })
        }
    }

    async remove(req: Request, res: Response, ) {
        const battletagRepository = getRepository(Battletag);
        
        try {
            const battletag = await battletagRepository.findOne(req.params.id);

            if (!battletag) {
                return res.status(404).json({ message: "Battletag not found." });
            }

            const result = await battletagRepository.remove(battletag);

            return res.status(200).json({ message: "Battletag successfully removed.", data: result })
        } catch (err) {
            return res.status(500).json({ message: "Something went wrong removing this battletag." })
        }
    }

}