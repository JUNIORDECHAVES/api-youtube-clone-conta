import { prisma } from "../../config/prisma";
import type { createUserInputDTO, createUserOutputDTO, loginUserInputDTO, loginUserOutputDTO } from "./UserDTO";
import bcrypt from "bcryptjs";
import { generateToken} from "../../services/authService";

export class CreateUser {
    async create(data: createUserInputDTO): Promise<createUserOutputDTO> {

        try {
            const userExists = await prisma.user.findUnique({
                where: { email: data.email }
            });
            
            if (userExists) {
                return { message:"User já existe" };
            }
            const hashedPassword = await this.hashPassword(data.password);

            await prisma.user.create({
                data: {
                    name: data.name,
                    surname: data.surname || null,
                    email: data.email,
                    password: hashedPassword,
                }
            });

            return { message: "User criado com sucesso!" };
        } catch (error) {
            console.log(error);
            return { message: "Error ao criar user" };
        }
        
            
    }

    async lista() {
        try {
            const users = await prisma.user.findMany();
            return users
        } catch (error) {
            return { message: "Error ao listar users" };
        }
    }

    async login(data: loginUserInputDTO): Promise<loginUserOutputDTO> {
        try {
            const user =await prisma.user.findUnique({
                where: { email: data.email }
            });
            if(!user) {
                return { message: "User nao encontrado" };
            }

            const isPasswordValid = await this.comparePassword(data.password, user.password);
            if(!isPasswordValid) return { message: "Senha invalida" };

            const token = generateToken(String(user.id))

            return { token , message: "User logado com sucesso!" };

        } catch (error) {
            return { token: null , message: `Error ao logar user` };
        }
    }

    async getUser(userId: string): Promise<any> {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId},
                select: {
                    id: true,
                    name: true
                }
            })
            if(!user) {
                return { message: "User nao encontrado" };
            }
            return { user };
        }
        catch (error) {
            return { message: "Error ao buscar user" };
        }   
    }

    private async hashPassword(password: string): Promise<string> {
        const salt_Rounds = 10;
        try {
            const salt = await bcrypt.genSalt(salt_Rounds)
            const passwordHash = await bcrypt.hash(password, salt);
            return passwordHash;
        } catch (err) {
            throw new Error("Error ao criptografar senha");
        }
    }

    private async comparePassword(password: string, hashedPassword: string) {
        try {
            const passwordValidated = await bcrypt.compare(password, hashedPassword);
            return passwordValidated;
        } catch (err) {
            throw new Error("Error ao comparar senha");
        }
    }

}
