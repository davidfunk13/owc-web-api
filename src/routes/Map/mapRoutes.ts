import express from 'express'
import { checkJwt } from "../../utils/checkJwt/checkJwt";
import { MapController } from "../../controller/Map/mapController";

const mapApi = express.Router();

const mapController = new MapController()


mapApi.get('/all',  mapController.all);
mapApi.get('/:id',  mapController.one);
mapApi.get('/type/:id',  mapController.type);

export default mapApi
