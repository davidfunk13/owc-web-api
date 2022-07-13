import "reflect-metadata";
import express from "express";
import routes from "./routes";
import { AppDataSource } from "./datasource";
import redis from "./redis";

const PORT = process.env.PORT || 3001;


AppDataSource.initialize().then(async () => {
    // sudo service redis-server start if erroring... do we really wanna go this far just to prevent an extra api call?
    redis.on('error', (err) => console.log('Redis client Error', err));

    await redis.connect().then(() => console.log("Redis connection successfull."))

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
