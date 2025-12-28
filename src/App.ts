import express, { type Application } from "express";
import { Routes } from "./routes/Routes";
import cors from "cors";


export class App {
    public readonly app: Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.enableCors();
        this.routes();
        
    }
    private middlewares(): void {
        this.app.use(express.json());
    }
    private routes(): void {
        this.app.use(Routes.configure())
    }
    private enableCors(): void{
        this.app.use(cors());
    }
}
