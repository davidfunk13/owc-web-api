"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var HeroController_1 = require("./controller/HeroController");
var UserController_1 = require("./controller/UserController");
exports.Routes = [{
        method: "get",
        route: "/users",
        controller: UserController_1.UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UserController_1.UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "remove"
    }, {
        method: "get",
        route: "/heroes",
        controller: HeroController_1.HeroController,
        action: "all"
    }, {
        method: "get",
        route: "/heroes/:name",
        controller: HeroController_1.HeroController,
        action: "one"
    }];
//# sourceMappingURL=routes.js.map