import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";
import { Session } from "../../entity/Session/Session";
import getErrors from "../../utils/getErrors/getErrors";
import { Game } from "../../entity/Game/Game";

export class GameController {
    async all(req: Request, res: Response) {
        const params = req.query.session;

        if (!params || isNaN(+params)) {
            return res.status(422).json({ message: "Session Id not provided." })
        }

        const session = await getRepository(Session).findOne(+params, { relations: ["sessions"] });

        if (!session) {
            return res.status(404).json({ message: "Session not found." })
        }

        const games = session.games;

        if (!games.length) {
            return res.status(404).json({ message: "No games for this session were found.", data: games })
        }

        return res.status(200).json({ message: "Games retrieved successfully.", data: games })

    }

    async one(req: Request, res: Response, next: NextFunction) {
        const game = await getRepository(Game).findOne(req.params.id);

        if (!game) {
            return res.status(404).json({ message: "Game not found." })
        }

        return res.status(200).json({ message: "Game found.", data: game });
    }

    async save(req: Request, res: Response, next: NextFunction ) {
        let { sessionId, ...gameInput } = req.body;
       
        const sessionRepo = getRepository(Session);
        
        const gameRepo = getRepository(Game);
        
        const game = new Game();
        
        Object.assign(game, gameInput)

        const session = await sessionRepo.findOne({ id: sessionId });

        if (!session) {
            return res.status(404).json({ message: "Session not found." });
        }

        game.session = session;

        try {
            const result = await gameRepo.save(game)
            return res.status(200).json({ message: "Game successfully saved to session.", data: result })
        } catch (err) {
            const errors = getErrors(err);

            return res.status(422).json({ message: "There was a problem saving this game", errors })
        }
    }

    async update(req: Request, res: Response) {
        const {
            id, 
            sessionId,
            ...gameInput
         } = req.body;

        
        const gameRepo = getRepository(Game);

        const game = await gameRepo.findOne(id, { relations: ["session"] });
        
        if (!game) {
            return res.status(404).json({ message: "Game not found." });
        }

        if (game.session.id !== +sessionId) {
            return res.status(422).json({ message: "Something went wrong." });
        }

        Object.assign(game, gameInput);

       
        try {
            const result = await gameRepo.save(game);

            return res.status(200).json({ message: "Game successfully updated.", data: result })
        } catch (err) {
            const errors = getErrors(err);

            return res.status(422).json({ message: "There was a problem updating this game", errors })
        }
    }


    async remove(req: Request, res: Response, next: NextFunction) {
        const params = req.params.id;

        const gameRepo = getRepository(Game);

        if (!params || isNaN(+params)) {
            return res.status(422).json({ message: "Game Id not provided." })
        }

        let game = await gameRepo.findOne(params);

        if (!game) {
            return res.json({ message: "Game not found." });
        }

        try {
            const result = await gameRepo.remove(game);
            return res.status(200).json({ message: "Game successfully removed.", data: result })
        } catch (err) {
            res.status(500).json({ message: "Something went wrong removing this game." })
        }

    }
}