import { HeroController } from "./controller/HeroController";
import {UserController} from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
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