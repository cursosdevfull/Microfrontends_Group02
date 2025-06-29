import "dotenv/config";
import "reflect-metadata";

import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { app } from "./app"
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";

(async () => {
    try {
        const serverBootstrap = new ServerBootstrap(app);
        const databaseBootstrap = new DatabaseBootstrap();

        const promises = [serverBootstrap.initialize(), databaseBootstrap.initialize()];
        await Promise.all(promises);
    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1);
    }
})()
