import type { PromiseHooks } from "node:v8"; 
export interface createUserInputDTO {
    name: string;
    surname?: string;
    email: string;
    password: string;
}

export interface createUserOutputDTO {
    message?: string;
}

export interface loginUserInputDTO {
    email: string;
    password: string;
}


export interface loginUserOutputDTO {
    token?: string | null
    message: string;
}