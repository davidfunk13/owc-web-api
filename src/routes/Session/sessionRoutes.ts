import { SessionController } from "../../controller/Session/sessionController"
import express from 'express'
import { checkJwt } from "../../utils/checkJwt/checkJwt";

const sessionApi = express.Router();

const sessionController = new SessionController()


sessionApi.post('/', checkJwt , sessionController.save);
sessionApi.get('/all', checkJwt, sessionController.all);
sessionApi.get('/:id', checkJwt, sessionController.one);
sessionApi.delete('/:id', checkJwt, sessionController.remove);

export default sessionApi
