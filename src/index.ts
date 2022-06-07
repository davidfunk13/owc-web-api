import "reflect-metadata";
import { createConnection, DataSource } from "typeorm";
import express from "express";
import routes from "./routes";
import { AppDataSource } from "./datasource";

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        
        app.use(express.json());
        
        app.use(express.urlencoded({ extended: true }))

        routes.map(route => app.use(route.path, route.handler));

        // start express server
        app.listen(PORT, () => {
            console.log("Server listening to incoming requests...")
        });
    })
    .catch(error => console.log(error));
 