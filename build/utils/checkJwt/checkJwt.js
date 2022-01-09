"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = __importDefault(require("express-jwt"));
var jwks_rsa_1 = __importDefault(require("jwks-rsa"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var secret = jwks_rsa_1.default.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://".concat(process.env.DOMAIN, "/.well-known/jwks.json")
});
var checkJwt = (0, express_jwt_1.default)({
    secret: secret,
    audience: process.env.AUTH0_AUDIENCE,
    issuer: "https://".concat(process.env.DOMAIN, "/"),
    algorithms: ['RS256']
});
exports.default = checkJwt;
//# sourceMappingURL=checkJwt.js.map