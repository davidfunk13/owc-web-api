
import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Hero } from "../../entity/Hero/Hero";
import Role from "../../types/Role";
import roleStringToNumberMap from "../../utils/maps/role/roleStringToNumberMap";


export class HeroController {
    async all(request: Request, response: Response, next: NextFunction) {
        const heroRepository = getRepository(Hero);

        const allHeroes = await heroRepository.find();

        response.json(allHeroes)
    }

    async oneByName(request: Request, response: Response, next: NextFunction) {
        const heroRepository = getRepository(Hero);

        const oneHero = await heroRepository.findOne({
            name: request.params.name
        });

        response.json(oneHero)
    }

    async role(request: Request, response: Response, next: NextFunction) {
        const heroRepository = getRepository(Hero);

        const byRole = await heroRepository.find({
            role: roleStringToNumberMap[request.params.role]
        });

        response.json(byRole)
    }



}