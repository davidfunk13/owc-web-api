import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";

export class BattletagController {
    async oneById(req: Request, res: Response, next: NextFunction) {
        const battletagRepository = getRepository(Battletag);
        
        
        //with[]="" params in express
        // use them for relations!
        //  let filters = req.query.with

        const battletag = await battletagRepository.findOne(req.params.id, {
            relations: ["sessions"]
        });

        if (!battletag) {
            return res.json({ message: "Battletag not found." })
        }

        res.json(battletag);
    }



    async save(req: Request, res: Response, next: NextFunction) {
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