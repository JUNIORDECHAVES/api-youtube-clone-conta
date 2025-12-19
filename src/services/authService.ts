import jwt from "jsonwebtoken";
import "dotenv/config";

export function generateToken(userId: string) {
    const secretKey = process.env.JWT_SECRET as string;
    if(!secretKey) {
        throw new Error("Erro interno no servidor: Chave de segurança ausente.");
    }

    const payload = { userId };

    const opcions: jwt.SignOptions = { expiresIn: "1d" };

    const token = jwt.sign(payload, secretKey, opcions);
    return token;
}

