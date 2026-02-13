import { container } from "@/IOC/Container";
import { ProfileCreateDTO, ProfileRepository, ProfileUpdateDTO } from "./repository";
import { Modules } from "@/IOC/ContainerModules";

export class ProfileService {

    constructor(
        private profileRepository : ProfileRepository 
    ){}

    async create(createDTO : ProfileCreateDTO) {
        return this.profileRepository.create(createDTO);
    }

    async findById(id : number) { 
        return this.profileRepository.findById(id);
    }

    async findAll(){
        return this.profileRepository.findAll();
    }

    async update(updateDto : ProfileUpdateDTO, id : number){
        return this.profileRepository.update(updateDto, id);
    }

    async delete(id : number) { 
        return this.profileRepository.delete(id);
    }

}