import { ProfileService } from "./service";
import { Profile } from "@/generated/prisma/client";
import { ProfileCreateDTO, ProfileUpdateDTO } from "./repository";
import { BaseError } from "@/types/BaseError";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export class ProfileController{

    constructor(
        private profileService : ProfileService 
    ){}

    async create(body : any) : Promise<Profile | undefined> {
        const profileSchema = z.object({
            bio: z.string().optional(),
            userId: z.number().int()
        });

        const createDTO = profileSchema.parse(body);
        return await this.profileService.create(createDTO);
    }

    async getAll() : Promise<Profile[]> {
        return await this.profileService.findAll();
    }

    async getById(id : number) : Promise<Profile | undefined> {
        const profile = this.profileService.findById(id);

        if(profile === undefined) throw new BaseError(StatusCodes.BAD_REQUEST, `Perfil com ID ${id} não encontrado`);

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