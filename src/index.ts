import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import routes from "./routes";

const PORT = process.env.PORT || 3001;

createConnection().then(async (connection) => {
    const app = express();

    routes.map(route => app.use(route.path, route.handler));
    
    // start express server
    app.listen(PORT, () => {
        console.log("Server listening to incoming requests...")
    });
})
.catch(error => console.log(error));
