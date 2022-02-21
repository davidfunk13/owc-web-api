import { config } from 'dotenv';
import jwt from 'express-jwt';
import JwksRsa from 'jwks-rsa';

config();

export const checkJwt = jwt({
    secret: JwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUDIENCE,
    issuer: `https://${process.env.DOMAIN}/`,
    algorithms: ['RS256']
});

