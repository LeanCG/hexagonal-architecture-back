import { User } from "../../domain/User";
import { UserCreateAt } from "../../domain/UserCreatedAt";
import { Email } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserPasword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";
import { TypeState } from "../../domain/UserTypeState";
import { UserUid } from "../../domain/UserUid";

export class EditUser {

    constructor(private repository: UserRepository){}
        async run(id: number, uid: string,email: string,userpassword: string,typestate: number, createat: Date): Promise<void>{
            const user = new User(
                new UserId(id),
                new UserUid(uid),
                new Email(email),
                new UserPasword(userpassword),
                new TypeState(typestate),
                new UserCreateAt(createat)
            )
            return  this.repository.edit(user);
        }
}