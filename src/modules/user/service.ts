import { container } from "@/IOC/Container";
import { Modules } from "@/IOC/ContainerModules";
import { UserCreateDTO, UserRepository } from "./repository";

export class UserService {

    constructor(
        private userRepository : UserRepository
    ){}

    async create(createDto : UserCreateDTO){
        return this.userRepository.create(createDto);
    }

    async findById(id : number){
        return this.userRepository.findById(id);
    }

    async findAll() {
        return this.userRepository.findAll();
    }

    async update(updateDto : UserCreateDTO, id : number){
        return this.userRepository.update(updateDto, id)
    }

    async delete(id : number){
        return this.userRepository.delete(id);
    }
}