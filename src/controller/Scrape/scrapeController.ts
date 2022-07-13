import axios from "axios";
import { Response } from "express";
import { Request } from "express-jwt";
import redis from "../../redis";
import paginateItems from "../../utils/paginate/paginate";

export class ScrapeController {
    async fetchList(req: Request, res: Response,) {
        const cacheTime = 300;
        const battletag = req.params.battletag;
        let page = +req.params.page;

        //we need to decide how we're gonna handle complete meltdowns so the FE knows what to do. 

        try {
            const cacheResults = await redis.get(battletag);

            if (cacheResults) {
                console.log("cache hit! :)")

                const b = JSON.parse(cacheResults);

                const paginatedData = paginateItems(b, page);

                return res.status(200).json({
                    fromCache: true,
                    ...paginatedData
                });
            }

            const b = await axios.get(process.env.BATTLETAG_URI + battletag);

            console.log("External API has been hit.");

            await redis.set(battletag, JSON.stringify(b.data), {
                EX: cacheTime,
                NX: true,
            })
                .then(() => console.log(`Set new key for battletag ${battletag} in the cache with a response containing ${b.data.length} items. This item expires in ${cacheTime / 60} mintes, or ${cacheTime} seconds`));

            const paginatedData = paginateItems(b.data, page);

            return res.status(200).json({
                fromCache: false,
                ...paginatedData
            });
        } catch (err) {
            return res.status(500).json({ message: "Something went wrong." })
        }

    }

}