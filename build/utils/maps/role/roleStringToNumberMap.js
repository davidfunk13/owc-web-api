"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = __importDefault(require("../../../types/Role"));
var roleStringToNumberMap = {
    tank: Role_1.default.Tank,
    damage: Role_1.default.Damage,
    support: Role_1.default.Support
};
exports.default = roleStringToNumberMap;
//# sourceMappingURL=roleStringToNumberMap.js.map