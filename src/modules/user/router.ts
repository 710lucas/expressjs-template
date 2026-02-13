import { Router } from "express";
import { UserController } from "./controller";
import { BaseError } from "@/types/BaseError";
import { container } from "@/IOC/Container";
import { Modules } from "@/IOC/ContainerModules";

const userRouter = Router();
const userController = container.get(Modules.UserController);

userRouter.get("/", async (req, res) => {
    const users = await userController.getAll();
    res.json(users);
});

userRouter.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new BaseError(400, `ID ${id} inválido`)
    }
    
    const user = await userController.getById(id);
    res.json(user);
});

userRouter.post("/", async (req, res) => {
    const user = await userController.create(req.body);
    res.status(201).json(user);
});

userRouter.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new BaseError(400, `ID ${id} inválido`)
    }

    const user = await userController.update(req.body, id);
    res.json(user);
});

userRouter.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new BaseError(400, `ID ${id} inválido`)
    }

    await userController.delete(id);
    res.status(204).send();
});

export default userRouter;
