import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserNotFoudError } from "../../domain/UserNotFoudError";
import { UserRepository } from "../../domain/UserRepository";

export class UserGetOneById{
    constructor(private repository:UserRepository){}

    async run(id: number): Promise<User>{
        const user = await this.repository.getOneById(new UserId(id));
        if(!user) throw new UserNotFoudError("Not found");

        return user;
    }
    }
