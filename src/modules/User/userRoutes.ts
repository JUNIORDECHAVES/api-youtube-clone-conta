import { Router } from "express";
import { UserController } from "./UserController";

class UserRoutes {
    public readonly router: Router;
    private readonly controller: UserController;

    constructor() {
        this.router = Router();
        this.controller = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/", this.controller.createUser);
        this.router.post("/login", this.controller.login);
        this.router.get("/list", this.controller.list);

    }
}

export const userRoutes = new UserRoutes().router;