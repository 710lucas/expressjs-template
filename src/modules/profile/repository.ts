import { container } from "@/IOC/Container";
import { Modules } from "@/IOC/ContainerModules";
import {PrismaClient, Profile} from '@/generated/prisma/client'

export type ProfileCreateDTO = Omit<Profile, 'id'>
export type ProfileUpdateDTO = ProfileCreateDTO;

export class ProfileRepository{

    private prisma : PrismaClient;

    constructor(){
        this.prisma = container.get(Modules.Prisma)
    }

    async create(profile : ProfileCreateDTO) : Promise<Profile | undefined> {
        return await this.prisma.profile.create({
            data : profile
        })
    }

    async findAll() : Promise<Profile[]>{
        return await this.prisma.profile.findMany() ?? [];
    }

    async findById(id : number) : Promise<Profile | undefined>{
        return await this.prisma.profile.findFirst({
            where : {
                id
            }
        }) ?? undefined;
    }

    async update(updateDto : ProfileUpdateDTO, id : number) : Promise<Profile | undefined>{
        return await this.prisma.profile.update({
            where : {
                id
            },
            data : updateDto
        })
    }

    async delete(id : number) {
        return await this.prisma.profile.delete({
            where : {
                id
            }
        })
    }

}