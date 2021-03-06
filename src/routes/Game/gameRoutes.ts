import { GameController} from "../../controller/Game/gameController"
import express from 'express'
import { checkJwt } from "../../utils/checkJwt/checkJwt";

const gameApi = express.Router();

const gameController = new GameController()

gameApi.post('/', checkJwt, gameController.save);
gameApi.get("/all", checkJwt, gameController.all)
gameApi.get('/:id', checkJwt, gameController.one);
gameApi.delete('/:id', checkJwt, gameController.remove);

export default gameApi
