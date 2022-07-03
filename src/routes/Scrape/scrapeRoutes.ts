import express from 'express'
import { checkJwt } from "../../utils/checkJwt/checkJwt";
import { ScrapeController } from "../../controller/Scrape/scrapeController";

const scrapeApi = express.Router();

const scrapeController = new ScrapeController()

scrapeApi.get('/battletags/:battletag/:page?', scrapeController.fetchList);

export default scrapeApi
