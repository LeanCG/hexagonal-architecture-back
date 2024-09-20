import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserRepository } from "../../domain/UserRepository";
import { UserUid } from "../../domain/UserUid";
import { Email } from "../../domain/UserEmail";
import { TypeState } from "../../domain/UserTypeState";
import { UserPasword } from "../../domain/UserPassword";
import { UserCreateAt } from "../../domain/UserCreatedAt";

export class UserCreate{
    constructor (private repository: UserRepository){}

    async run(id:number, userUid:string, email:string, password:string, typestate: number, date: Date): Promise <void> {
        const user = new User(
            new UserId(id),
            new UserUid(userUid),
            new Email(email),
            new UserPasword(password),
            new TypeState(typestate),
            new UserCreateAt(date)
        );

        return this.repository.create(user);
    }
 } 