import type { createUserInputDTO, createUserOutputDTO, loginUserInputDTO, loginUserOutputDTO } from "./UserDTO";
import { CreateUser } from "./UserRepository";


export class UserService {
    constructor(private readonly repository = new CreateUser()) { }

    async createUser(data: createUserInputDTO): Promise<createUserOutputDTO> {

        if (!data.email) {
            return { message: "Email is required" };
        }

        if (!data.password) {
            return { message: "Password is required" };
        }

        if (!data.name) {
            return { message: "Name is required" };
        }

        return this.repository.create(data)
    }

    async lista() {
        return this.repository.lista()
    }

    async login(data: loginUserInputDTO): Promise<loginUserOutputDTO> { 
        if (!data.email) {
            return { message: "Email is required" };
        }

        if (!data.password) {
            return { message: "Password is required" };
        }
        return this.repository.login(data)
    }
}