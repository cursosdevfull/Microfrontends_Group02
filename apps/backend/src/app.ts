import express, { Application } from "express";
import { patientRoute } from "./modules/patient/patient.route";
import { historyRoute } from "./modules/history/history.route";

class App {
    readonly app: Application

    constructor() {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes() {
        this.app.use("/patient", patientRoute);
        this.app.use("/history", historyRoute);
    }
}

export const app = new App().app;