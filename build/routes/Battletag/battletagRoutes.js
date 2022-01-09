"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BattletagController_1 = require("../../controller/Battletag/BattletagController");
var express_1 = __importDefault(require("express"));
var checkJwt_1 = __importDefault(require("../../utils/checkJwt/checkJwt"));
var battletagApi = express_1.default.Router();
var battletagController = new BattletagController_1.BattletagController();
battletagApi.post('/', checkJwt_1.default, battletagController.save);
battletagApi.get('/:id', checkJwt_1.default, battletagController.oneById);
battletagApi.delete('/:id', checkJwt_1.default, battletagController.remove);
exports.default = battletagApi;
//# sourceMappingURL=battletagRoutes.js.map