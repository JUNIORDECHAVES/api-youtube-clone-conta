import express, { type Application } from "express";
import { Routes } from "./routes/Routes";

export class App {
    public readonly app: Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        
    }
    private middlewares(): void {
        this.app.use(express.json());
    }
    private routes(): void {
        this.app.use(Routes.configure())
    }
}
