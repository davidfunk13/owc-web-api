import "reflect-metadata";
import { createConnection, UsingJoinColumnIsNotAllowedError } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import routes from "./routes";

const PORT = process.env.PORT || 3001;

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    routes.map(route => {
        app[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            result.then((result: unknown) => res.send(result));
        });
    });


    // start express server
    app.listen(PORT, () => {
        console.log("Server listening to incoming requests...")
    });

    // // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Butt",
    //     lastName: "McPenisFartFace",
    //     age: 27
    // }));


    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "BigBalls",
    //     lastName: "McAssPussy",
    //     age: 75
    // }));

}).catch(error => console.log(error));
