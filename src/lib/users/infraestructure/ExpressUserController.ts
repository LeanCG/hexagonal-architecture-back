import { Request, Response} from "express";
import { ServiceContainer } from "../../shared/infraestructure/SrviceContainer";
import { UserNotFoudError } from "../domain/UserNotFoudError";

export class ExpressUserController {
    async getAll(req: Request, res:Response){
        const users = await ServiceContainer.user.getAll.run();
        return res.json(users).status(200);
    }

    async getOneById(req: Request, res:Response){
        try{
        const user = await ServiceContainer.user.getOneById.run(parseInt(req.params.id));

        return  res.json(user).status(200);
        }
        catch(error){
            if(error instanceof UserNotFoudError){
                return res.status(404).json({message: error.message});
            }
            throw error;
        }
    }

    async create(req:Request, res:Response){
        const {createdAt,email,id,name} = req.body as {
                    id: string;
                    name: string;
                    email:string;
                    createdAt:string;
                }
                await ServiceContainer.user.create.run(req.body)
    }
    

}