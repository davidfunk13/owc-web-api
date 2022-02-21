
import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Hero } from "../../entity/Hero/Hero";
import roleStringToNumberMap from "../../utils/maps/role/roleStringToNumberMap";


export class HeroController {
    async all(req: Request, res: Response, next: NextFunction) {
        const heroRepository = getRepository(Hero);

        const heroes = await heroRepository.find();

        return res.status(200).json({ message: "All heroes found", data: heroes })
    }

    async one(req: Request, res: Response) {
        const heroRepository = getRepository(Hero);
        const name = req.query.name as string;

        if (!name) {
            return res.status(422).json({ message: "Bad Request" })
        }

        const hero = await heroRepository.findOne({ name });

        if (!hero) {
            return res.status(404).json({ message: "Hero not found" })
        }

        return res.status(200).json({ message: "Hero found.", data: hero })
    }

    async role(req: Request, res: Response) {
        const heroRepository = getRepository(Hero);

        const heroes = await heroRepository.find({ role: roleStringToNumberMap[req.params.role] });

        if (!heroes.length) {
            return res.status(404).json({ message: "No Heroes found", data: [] })
        }

        return res.status(200).json({ message: `Heroes Found for role ${req.params.role}`, data: heroes })
    }
}