import { Modules } from "@/IOC/ContainerModules";
import { ProfileService } from "./service";
import { container } from "@/IOC/Container";
import { Profile } from "@/generated/prisma/client";
import { ProfileCreateDTO, ProfileUpdateDTO } from "./repository";
import { BaseError } from "@/types/BaseError";

export class ProfileController{

    constructor(
        private profileService : ProfileService = container.get(Modules.ProfileService)
    ){}

    async create(body : any) : Promise<Profile | undefined> {
        const createDTO = body as ProfileCreateDTO;
        return await this.profileService.create(createDTO);
    }

    async getAll() : Promise<Profile[]> {
        return await this.profileService.findAll();
    }

    async getById(id : number) : Promise<Profile | undefined> {
        const profile = this.profileService.findById(id);

        if(profile === undefined) throw new BaseError(400, `Perfil com ID ${id} não encontrado`);

        return profile;
    }

    async update(body : any, id : number) : Promise<Profile | undefined> {
        const updatePayload = body as ProfileUpdateDTO;

        const profile = this.profileService.update(updatePayload, id);

        return profile;
    }

    async delete(id : number) {
        return await this.profileService.delete(id);
    }

}