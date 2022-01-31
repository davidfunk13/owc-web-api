import { SessionController } from "../../controller/Session/SessionController"
import express from 'express'
import { checkJwt } from "../../utils/checkJwt/checkJwt";

const sessionApi = express.Router();

const sessionController = new SessionController()


sessionApi.post('/', checkJwt , sessionController.save);
sessionApi.get('/:id', checkJwt, sessionController.oneById);
sessionApi.delete('/:id', checkJwt, sessionController.remove);

export default sessionApi
