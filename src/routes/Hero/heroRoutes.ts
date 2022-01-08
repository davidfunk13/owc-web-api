import { HeroController } from "../../controller/Hero/HeroController"

const heroRoutes = [{
    method: "get",
    route: "/heroes",
    controller: HeroController,
    action: "all"
},{
    method: "get",
    route: "/heroes/:name",
    controller: HeroController,
    action: "one"
}];

export default heroRoutes