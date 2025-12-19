import { Router } from "express";
import { userRoutes } from "../modules/User/userRoutes";
import type { Request, Response } from "express";

export class Routes {
    static configure() {
        const router = Router();

        router.use("/user", userRoutes);
        // router.use("/posts", /*postRoutes*/);

        return router;
    }
}
