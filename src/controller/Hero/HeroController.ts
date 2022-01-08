
import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Hero } from "../../entity/Hero";

export class HeroController {

    private heroRepository = getRepository(Hero);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.heroRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.heroRepository.findOne(request.params.name);
    }

}