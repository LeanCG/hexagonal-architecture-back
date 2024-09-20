import { NextFunction, Request, Response} from "express";
import { ServiceContainer } from "../../shared/infraestructure/SrviceContainer";
import { UserNotFoudError } from "../domain/UserNotFoudError";

export class ExpressUserController {
    async getAll(req: Request, res:Response, next:NextFunction){
        try{
            const users = await ServiceContainer.user.getAll.run();
            return res.json(users.map((user)=> user.mapToPrimitives())).status(200);
        }
        catch(error){
            next(error);
        }
    }

    async getOneById(req: Request, res:Response, next:NextFunction){
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

    async create(req:Request, res:Response, next:NextFunction){
        try{
            console.log("-----create-----\n",req.body)
        const {id,uid,email,password,typestate,createdAt} = req.body as {
            id: number;
            uid: string;
            email:string;
            password: string;
            typestate: number;
            createdAt:string;
        }
        await ServiceContainer.user.create.run(id,uid,email,password,typestate,new Date(createdAt))
        return res.status(201).send();
        }catch(error){
            next(error);
        }
    }
    
    async edit(req:Request, res:Response, next:NextFunction){
        try {
            const {id,uid,email,password,typestate,createdAt} = req.body as {
                id: number;
                uid: string;
                email:string;
                password: string;
                typestate: number;
                createdAt:string;
            }
            await ServiceContainer.user.edit.run(id,uid,email,password,typestate,new Date(createdAt))
            return res.status(204).json();
        } catch (error) {
            if(error instanceof UserNotFoudError) {
                return res.status(404).json({message: error.message})
            }
            next(error);
        }
    }

    async delete(req: Request, res: Response, next:NextFunction){
        try {
            await ServiceContainer.user.delete.run(parseInt(req.params.id));
            return res.status(204).json();
        } catch (error) {
            next(error);
        }
    }
}