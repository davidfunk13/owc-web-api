import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import { config } from 'dotenv'

config();

const secret = jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`
});

const checkJwt = jwt({
    secret: secret,
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.DOMAIN}/`,
    algorithms: ['RS256']
});

export default checkJwt