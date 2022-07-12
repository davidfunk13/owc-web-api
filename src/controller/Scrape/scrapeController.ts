import axios from "axios";
import { Response } from "express";
import { Request } from "express-jwt";

export class ScrapeController {
    async fetchList(req: Request, res: Response,) {
        try {
            //redis cache coming to the rescue...
            const battletag= req.params.battletag;

            let page = +req.params.page;

            const b = await axios.get(process.env.BATTLETAG_URI + battletag)

            const pageCount = Math.ceil(b.data.length / 10);
            
            if (!page) {
                 page = 1; 
            }
            
            if (page > pageCount) {
                page = pageCount
            }

            return res.status(200).json({
                page: page,
                pages: pageCount,
                data: b.data.slice(page * 10 - 10, page * 10)
            });
        } catch (err) {
            return res.status(500).json({ message: "Something went wrong." })
        }
    }

}