import { HeroController } from "../../controller/Hero/HeroController"
import express from 'express'

const heroApi = express.Router();

const heroController = new HeroController()

heroApi.get('/', heroController.all);
heroApi.get('/:role', heroController.role);
heroApi.get('/one/:name', heroController.oneByName);

export default heroApi