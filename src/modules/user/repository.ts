import { PrismaClient, User } from "@/generated/prisma/client";
import { container } from "@/IOC/Container";
import { Modules } from "@/IOC/ContainerModules";

export type UserCreateDTO = Omit<User, 'id'>
export type UserResponseDTO = Omit<User, 'password'>

export class UserRepository {

    private prisma : PrismaClient;

    constructor(){
        this.prisma = container.get(Modules.Prisma)
    }

    async findById(id : number) : Promise<UserResponseDTO | undefined>{
        return await this.prisma.user.findFirst({
            where:{
                id
            }
        }) ?? undefined;
    }

    async findAll() : Promise<UserResponseDTO[]>{
        return await this.prisma.user.findMany() ?? [];
    }

    async create(createDto : UserCreateDTO) : Promise<UserResponseDTO | undefined>{
        return await this.prisma.user.create({
            data : createDto
        })
    }

    async update(updateDto : UserCreateDTO, id : number) : Promise<UserResponseDTO | undefined>{
        return await this.prisma.user.update({
            where: {
                id
            },
            data : updateDto
        })
    }

    async delete(id : number) {
        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}