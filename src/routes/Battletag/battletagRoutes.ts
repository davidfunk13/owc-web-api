import { BattletagController } from "../../controller/Battletag/BattletagController"
import express from 'express'
import checkJwt from "../../utils/checkJwt/checkJwt";

const battletagApi = express.Router();

const battletagController = new BattletagController()

battletagApi.post('/', battletagController.save);
battletagApi.get('/:id', checkJwt, battletagController.oneById);
battletagApi.delete('/remove/:id', battletagController.remove);

export default battletagApi
