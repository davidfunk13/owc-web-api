"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HeroController_1 = require("../../controller/Hero/HeroController");
var express_1 = __importDefault(require("express"));
var heroApi = express_1.default.Router();
var heroController = new HeroController_1.HeroController();
heroApi.get('/', heroController.all);
heroApi.get('/:role', heroController.role);
heroApi.get('/one/:name', heroController.oneByName);
exports.default = heroApi;
//# sourceMappingURL=heroRoutes.js.map