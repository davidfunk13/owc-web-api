import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";

const PORT = process.env.PORT || 3001;

const app = express();

createConnection()
    .then(async () => {
        
        app.use(express.json());
        
        app.use(express.urlencoded({ extended: true }))

        // start express server
        app.listen(PORT, () => {
            console.log("Server listening to incoming requests...")
        });
    })
.catch(error => console.log(error));

export default app;