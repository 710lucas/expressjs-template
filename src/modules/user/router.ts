import { Router } from "express";
import { StatusCodes } from "http-status-codes";
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
        throw new BaseError(StatusCodes.BAD_REQUEST, `ID ${id} inválido`)
    }
    
    const user = await userController.getById(id);
    res.json(user);
});

userRouter.post("/", async (req, res) => {
    const user = await userController.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
});

userRouter.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new BaseError(StatusCodes.BAD_REQUEST, `ID ${id} inválido`)
    }

    const user = await userController.update(req.body, id);
    res.json(user);
});

userRouter.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new BaseError(StatusCodes.BAD_REQUEST, `ID ${id} inválido`)
    }

    await userController.delete(id);
    res.status(StatusCodes.NO_CONTENT).send();
});

export default userRouter;
