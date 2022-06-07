import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { GameMap } from "../../entity/GameMap/GameMap";
import { AppDataSource } from "../../datasource";

export class MapController {
    async type(req: Request, res: Response) {
        const params = req.params.id
        
        if(!params || isNaN(+params)){
            return res.status(422).json({message: "Game type id not provided"})
        }

        const maps = await AppDataSource.getRepository(GameMap).findBy({gameTypeId: +params });
        
        if (!maps.length) {
            return res.status(404).json({ message: "No maps found." })
        }

        
        return res.status(200).json({ message: "Maps retrieved successfully", data: maps })
    }

    async one(req: Request, res: Response) {
        const params = req.params.id;
        
        if(!params || isNaN(+params)){
            return res.status(422).json({message: "Map id not provided"})
        }

        const map = await AppDataSource.getRepository(GameMap).findOneBy({id:+params});

        if (!map) {
            return res.status(404).json({ message: "Map not found." })
        }

        return res.status(200).json({ message: "Map found.", data: map });
    }

    async all(req: Request, res: Response) {
        const maps = await AppDataSource.getRepository(GameMap).find();

        if (!maps) {
            return res.status(404).json({ message: "No Maps found." })
        }

        return res.status(200).json({ message: "Maps found.", data: maps });
    }

}