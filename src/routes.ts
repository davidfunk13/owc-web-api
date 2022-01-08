import heroApi from "./routes/Hero/heroRoutes";
import battletagApi from "./routes/Battletag/battletagRoutes";

const routes = [
    { path: '/api/battletag', handler: battletagApi },
    { path: '/api/hero', handler: heroApi }
];

export default routes