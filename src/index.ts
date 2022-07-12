import "reflect-metadata";
import { createConnection, DataSource } from "typeorm";
import express from "express";
import routes from "./routes";
import { AppDataSource } from "./datasource";
import { createClient } from 'redis';

const PORT = process.env.PORT || 3001;

AppDataSource.initialize().then(async () => {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('key', 'value');
    const value = await client.get('key')
    console.log({ value })
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
