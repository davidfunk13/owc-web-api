import { BattletagController } from "../../controller/Battletag/battletagController"
import express from 'express'
import { checkJwt } from "../../utils/checkJwt/checkJwt";

const battletagApi = express.Router();

const battletagController = new BattletagController()

battletagApi.post('/', checkJwt, battletagController.save);
battletagApi.get('/all', checkJwt, battletagController.getAll);
battletagApi.get('/:id', checkJwt, battletagController.one);
battletagApi.delete('/:id', checkJwt, battletagController.remove);

export default battletagApi
