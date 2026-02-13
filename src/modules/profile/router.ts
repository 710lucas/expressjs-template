import { container } from "@/IOC/Container";
import { Modules } from "@/IOC/ContainerModules";
import { BaseError } from "@/types/BaseError";
import { Router } from "express";
import { ProfileController } from "./controller";

const profileRouter = Router();
const profileController : ProfileController = container.get(Modules.ProfileController);

profileRouter.get("/", async(req, res) => {
    res.json(await profileController.getAll());
})

profileRouter.get("/:id", async(req, res) =>{
    const id = parseInt(req.params.id)
    if(isNaN(id)) throw new BaseError(400, `ID ${id} inválido`);

    res.json(await profileController.getById(id));
})

profileRouter.post("/", async (req, res) => {
    res.status(201).json(await profileController.create(req.body))
})

profileRouter.put("/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)) throw new BaseError(400, `ID ${id} inválido`);

    res.json(await profileController.update(req.body, id));
})

profileRouter.delete("/:id", async(req, res) => {
    const id = parseInt(req.params.id)
    if(isNaN(id)) throw new BaseError(400, `ID ${id} inválido`);

    res.status(204).json(await profileController.delete(id));
})

export default profileRouter;