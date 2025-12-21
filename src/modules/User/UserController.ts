import type { AuthenticatedRequest } from "../../Middleware/authMiddleware";
import { UserService } from "./userService";
import type { Request, Response } from "express";

export class UserController {
    constructor(
        private readonly service = new UserService()
    ) { }

    createUser = async (req: Request, res: Response) => {
        const user = await this.service.createUser(req.body);

        return res.status(201).json(user);
    }

    list = async (req: Request, res: Response) => {
        const users = await this.service.lista();
        res.status(200).json(users);
    }

    login = async (req: Request, res: Response) => {
        const user = await this.service.login(req.body);
        return res.status(200).json(user);
    }

    getUser = async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({ message: "User nao encontrado no token" });
        const user = await this.service.getUser(userId);
        return res.status(200).json(user);
    }
}