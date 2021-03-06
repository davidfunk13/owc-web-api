import { Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";
import getFilters from "../../utils/getFilters/getFilters";
import IQueryFilters from "../../types/IQueryFilters";
import parseBool from "../../utils/parseBool/parseBool";
import { AppDataSource } from "../../datasource";

export class BattletagController {
    async one(req: Request, res: Response) {
        try {
            const battletagRepository = AppDataSource.getRepository(Battletag);

            const filters = getFilters(req.query.with as IQueryFilters)

            const battletag = await battletagRepository.findOne({ where: { id: +req.params.id }, relations: filters });

            if (!battletag) {
                return res.status(400).json({ message: "Battletag not found." })
            }

            return res.status(200).json({ message: "Battletag found.", data: battletag })
        } catch (err) {
            return res.status(500).json({ message: "Something went wrong." })
        }

    }

    async getAll(req: Request, res: Response) {
        try {
            const battletagRepository = AppDataSource.getRepository(Battletag);

            const filters = getFilters(req.query.with as IQueryFilters)


            if (!req.query.id) {
                return res.status(422).json({ message: "User id not included in request." })
            }

            const battletags = await battletagRepository.find({ where: { userId: String(req.query.id) }, relations: filters });

            if (!battletags.length) {
                return res.status(400).json({ message: "Battletags not found for this user." })
            }

            return res.status(200).json({ message: "Battletags found.", data: battletags })
        } catch (err) {
            return res.status(500).json({ message: "Something went wrong." })
        }

    }

    async save(req: Request, res: Response) {
        const battletagRepository = AppDataSource.getRepository(Battletag);

        const battletag = new Battletag();

        Object.assign(battletag, req.body);

        battletag.isPublic = parseBool(battletag.isPublic)
        battletag.level = battletag.level ? +battletag.level : undefined
        battletag.playerLevel = battletag.playerLevel ? +battletag.playerLevel : undefined

        try {
            const result = await battletagRepository.save(battletag);

            return res.status(200).json({ message: "Battletag saved.", data: result })
        } catch (err) {
            console.log({ err })
            return res.status(500).json({ err, message: "Somethsssssing went wrong." })
        }
    }

    async remove(req: Request, res: Response,) {
        try {
            const battletagRepository = AppDataSource.getRepository(Battletag);

            const battletag = await battletagRepository.findOneBy({ id: +req.params.id });

            if (!battletag) {
                return res.status(404).json({ message: "Battletag not found." });
            }

            const result = await battletagRepository.remove(battletag);

            return res.status(200).json({ message: "Battletag successfully removed.", data: result })
        } catch (err) {
            return res.status(500).json({ message: "Something went wrong." })
        }
    }
}