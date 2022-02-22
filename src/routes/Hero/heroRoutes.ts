import { HeroController } from "../../controller/Hero/heroController"
import express from 'express'

const heroApi = express.Router();

const heroController = new HeroController()

heroApi.get('/', heroController.all);
heroApi.get('/one', heroController.one);
heroApi.get('/role/:role', heroController.role);

export default heroApi