import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { GameMap } from "../../entity/GameMap/GameMap";

export class MapController {
    async type(req: Request, res: Response) {
        const params = req.params.id
        
        if(!params || isNaN(+params)){
            return res.status(422).json({message: "Game type id not provided"})
        }

        const maps = await getRepository(GameMap).find({gameTypeId: +params });
        
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

        const map = await getRepository(GameMap).findOne(params);

        if (!map) {
            return res.status(404).json({ message: "Map not found." })
        }

        return res.status(200).json({ message: "Map found.", data: map });
    }

    async all(req: Request, res: Response) {
        const maps = await getRepository(GameMap).find();

        if (!maps) {
            return res.status(404).json({ message: "No Maps found." })
        }

        return res.status(200).json({ message: "Maps found.", data: maps });
    }

}