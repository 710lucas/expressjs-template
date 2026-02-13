import { container } from "@/IOC/Container";
import { Modules } from "@/IOC/ContainerModules";
import { UserCreateDTO, UserResponseDTO } from "./repository";
import { UserService } from "./service";
import { BaseError } from "@/types/BaseError";

export class UserController{

    constructor(
        private userService : UserService = container.get(Modules.UserService)
    ){}

    async create(body : any) : Promise<UserResponseDTO | undefined>{
        const createDto = body as UserCreateDTO;
        return await this.userService.create(createDto);
    }

    async getAll() : Promise<UserResponseDTO[]>{
        return await this.userService.findAll() ?? [];
    }

    async getById(id : number) : Promise<UserResponseDTO | undefined>{
        const user = this.userService.findById(id);

        if(user === undefined) throw new BaseError(400, `Usuário com ID ${id} não encontrado`);

        return (user);
    }

    async update(body : any, id : number) : Promise<UserResponseDTO | undefined>{
        const updatePayload = body as UserCreateDTO;

        const user = this.userService.update(updatePayload, id);

        return user;
    }

    async delete(id : number) {
        return await this.userService.delete(id) ;
    }

}