import jwt from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";

interface JwtPayload {
    userId: string;
}

export interface  AuthenticatedRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next :NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token de Autorização não encontrado" });
    }

    const token = authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: "Token de Autorização inválido" });
    }

    const secretKey = process.env.JWT_SECRET as string;
    if(!secretKey) {
        return res.status(500).json({ message: "Erro interno no servidor: Chave de segurança ausente." });
    }

    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token de autorização expirado" });
        }
        return res.status(401).json({ message: "Token de Autorização inválido" });
    }

};