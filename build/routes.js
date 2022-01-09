"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var heroRoutes_1 = __importDefault(require("./routes/Hero/heroRoutes"));
var battletagRoutes_1 = __importDefault(require("./routes/Battletag/battletagRoutes"));
var routes = [
    { path: '/api/battletag', handler: battletagRoutes_1.default },
    { path: '/api/hero', handler: heroRoutes_1.default }
];
exports.default = routes;
//# sourceMappingURL=routes.js.map