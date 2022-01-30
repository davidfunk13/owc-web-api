import { BattletagController } from "../../controller/Battletag/BattletagController"
import express from 'express'
import {checkJwt} from "../../utils/checkJwt/checkJwt";
// import guardFactory from "express-jwt-permissions";

// const guard = guardFactory();

const battletagApi = express.Router();

const battletagController = new BattletagController()

// battletagApi.post('/', [checkJwt, guard.check(["read:battletag, write:battletag"])] , battletagController.save);
// battletagApi.get('/:id', [checkJwt, guard.check("read:battletag")], battletagController.oneById);
// battletagApi.delete('/:id', [checkJwt, guard.check(["read:battletag", "write:battletag"])], battletagController.remove);

battletagApi.post('/', checkJwt , battletagController.save);
battletagApi.get('/:id', checkJwt, battletagController.oneById);
battletagApi.delete('/:id', checkJwt, battletagController.remove);
export default battletagApi
