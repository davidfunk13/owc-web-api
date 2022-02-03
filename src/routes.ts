import heroApi from "./routes/Hero/heroRoutes";
import battletagApi from "./routes/Battletag/battletagRoutes";
import sessionApi from "./routes/Session/sessionRoutes";

const routes = [
    { path: '/api/battletag', handler: battletagApi },
    { path: '/api/session', handler: sessionApi },
    { path: '/api/hero', handler: heroApi }
];

export default routes