import { HeroController } from "./controller/Hero/HeroController";
import { UserController } from "./controller/User/UserController";
import heroRoutes from "./routes/Hero/heroRoutes";
import userRoutes from "./routes/User/userRoutes";

const routes = [
    ...heroRoutes,
    ...userRoutes
];

export default routes