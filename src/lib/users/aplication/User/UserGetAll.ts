import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/User";

export class UserGetAll {
    constructor (private repository:UserRepository){}

    async run():Promise<User[]>{
        return this.repository.getAll();
    }
}