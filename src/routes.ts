import heroApi from "./routes/Hero/heroRoutes";
import battletagApi from "./routes/Battletag/battletagRoutes";
import sessionApi from "./routes/Session/sessionRoutes";
import mapApi from "./routes/Map/mapRoutes";
import gameApi from "./routes/Game/gameRoutes";
import scrapeApi from "./routes/Scrape/scrapeRoutes";

const routes = [
    { path: '/api/battletag', handler: battletagApi },
    { path: '/api/scrape', handler: scrapeApi },
    { path: '/api/session', handler: sessionApi },
    { path: '/api/hero', handler: heroApi },
    { path: '/api/map', handler: mapApi },
    { path: '/api/game', handler: gameApi }
];

export default routes