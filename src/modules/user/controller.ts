import { UserCreateDTO, UserResponseDTO } from "./repository";
import { UserService } from "./service";
import { BaseError } from "@/types/BaseError";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export class UserController{

    constructor(
        private userService : UserService
    ){}

    async create(body : any) : Promise<UserResponseDTO | undefined>{
        const userSchema = z.object({
            email: z.string().email(),
            name: z.string().min(3),
            password: z.string().min(6)
        });
        
        const createDto = userSchema.parse(body);
        return await this.userService.create(createDto);
    }

    async getAll() : Promise<UserResponseDTO[]>{
        return await this.userService.findAll() ?? [];
    }

    async getById(id : number) : Promise<UserResponseDTO | undefined>{
        const user = this.userService.findById(id);

        if(user === undefined) throw new BaseError(StatusCodes.BAD_REQUEST, `Usuário com ID ${id} não encontrado`);

        return (user);
    }

    async update(body : any, id : number) : Promise<UserResponseDTO | undefined>{
        const userSchema = z.object({
            email: z.string().email().optional(),
            name: z.string().min(3).optional(),
            password: z.string().min(6).optional()
        });

        const updatePayload = userSchema.parse(body);

        const user = this.userService.update(updatePayload, id);

        return user;
    }

    async delete(id : number) {
        return await this.userService.delete(id) ;
    }

}