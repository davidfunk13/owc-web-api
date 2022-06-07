import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Battletag } from "../../entity/Battletag/Battletag";
import { Session } from "../../entity/Session/Session";
import getErrors from "../../utils/getErrors/getErrors";
import getFilters from "../../utils/getFilters/getFilters";
import QueryFilters from "../../types/QueryFilters";
import { readJsonConfigFile } from "typescript";
import { AppDataSource } from "../../datasource";

export class SessionController {
    async all(req: Request, res: Response) {
        try {
            const params = req.query.battletag;

            if (!params || isNaN(+params)) {
                return res.status(422).json({ message: "Battletag Id not provided." })
            }

            const battletagRepo =  AppDataSource.getRepository(Battletag)
            
            const battletag = await battletagRepo.findOne({where: {id: +params}, relations: ["sessions"] });

            if (!battletag) {
                return res.status(404).json({ message: "Battletag not found." })
            }

            const sessions = battletag.sessions;

            if (!sessions.length) {
                return res.status(404).json({ message: "No sessions for this battletag were found.", data: sessions })
            }

            return res.status(200).json({ message: "Sessions retrieved successfully.", data: sessions })
        } catch (err) {
            res.status(500).json({ message: "Something went wrong." })
        }
    }

    async one(req: Request, res: Response, next: NextFunction) {
        try {
            const sessionRepo = AppDataSource.getRepository(Session);

            const filters = getFilters(req.query.with as QueryFilters);
            
            const session = await sessionRepo.findOne({where: {id: +req.params.id},  relations: filters })

            if (!session) {
                return res.status(404).json({ message: "Session not found." })
            }

            return res.status(200).json({ message: "Session found.", data: session });
        } catch (err) {
            return res.status(500).json({ message: "Something went wrong." })
        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
        try {
            let { battletagId, ...sessionInput } = req.body;

            const battletagRepo = AppDataSource.getRepository(Battletag);

            const sessionRepo = AppDataSource.getRepository(Session);

            const session = new Session();

            Object.assign(session, sessionInput)

            const battletag = await battletagRepo.findOneBy({ id: battletagId });

            if (!battletag) {
                return res.status(404).json({ message: "Battletag not found." });
            }

            session.battletag = battletag;

            try {
                const result = await sessionRepo.save(session);
                
                return res.status(200).json({ message: "Session successfully saved to battletag.", data: result })
            } catch (err) {
                const errors = getErrors(err);

                return res.status(422).json({ message: "There was a problem saving this session.", errors })
            }

        } catch (err) {
            return res.status(500).json({ message: "Something went wrong." })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {
                id,
                battletagId,
                tankSrStart,
                damageSrStart,
                supportSrStart,
                ...sessionInput
            } = req.body;

            const sessionRepo = AppDataSource.getRepository(Session);

            if (!id) {
                return res.status(404).json({ message: "Session not found." });
            }

            const session = await sessionRepo.findOne({where: {id},  relations: ["battletag"] });

            if (!session) {
                return res.status(404).json({ message: "Session not found." });
            }

            if (session.battletag.id !== +battletagId) {
                return res.status(422).json({ message: "Something went wrong." });
            }

            Object.assign(session, sessionInput);

            try {
                const result = await sessionRepo.save(session);

                return res.status(200).json({ message: "Session successfully updated.", data: result })
            } catch (err) {
                const errors = getErrors(err);

                return res.status(422).json({ message: "There was a problem updating this session", errors })
            }
        } catch (err) {
            res.status(500).json({ message: "Something went wrong." })
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const params = req.params.id;

            const sessionRepo = AppDataSource.getRepository(Session);

            if (!params || isNaN(+params)) {
                return res.status(422).json({ message: "Session Id not provided." })
            }

            let session = await sessionRepo.findOneBy({id:+params});

            if (!session) {
                return res.json({ message: "Session not found." });
            }

            try {
                const result = await sessionRepo.remove(session);
                return res.status(200).json({ message: "Session successfully removed.", data: result })

            } catch (err) {
                res.status(500).json({ message: "Something went wrong removing this session." })
            }
        } catch (err) {
            res.status(500).json({ message: "Something went wrong." })
        }
    }
}