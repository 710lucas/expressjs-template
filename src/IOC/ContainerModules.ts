import 'dotenv/config'
import { PrismaPg } from "@prisma/adapter-pg";
import { container } from './Container';
import { PrismaClient } from '@/generated/prisma/client';
import { UserRepository } from '@/modules/user/repository';
import { UserService } from '@/modules/user/service';
import { ProfileRepository } from '@/modules/profile/repository';
import { ProfileService } from '@/modules/profile/service';
import { ProfileController } from '@/modules/profile/controller';
import { UserController } from '@/modules/user/controller';

export function InitModules(){

    const prisma = new PrismaClient({adapter: new PrismaPg(process.env.DATABASE_URL)})
    const userRepository = new UserRepository();
    const userService = new UserService();
    const userController = new UserController();
    const profileRepository = new ProfileRepository();
    const profileService = new ProfileService();
    const profileController = new ProfileController();


    container.register(Modules.Prisma, prisma);
    container.register(Modules.UserRepository, userRepository);
    container.register(Modules.UserService, userService);
    container.register(Modules.UserController, userController);
    container.register(Modules.ProfileRepository, profileRepository)
    container.register(Modules.ProfileService, profileService);
    container.register(Modules.ProfileController, profileController);
}

export enum Modules {
    Prisma='prisma',
    UserRepository='userRepository' ,
    UserService = 'userService',
    UserController = 'userController',
    ProfileRepository = 'profileRepository',
    ProfileService = 'profileService',
    ProfileController = 'profileController'
}