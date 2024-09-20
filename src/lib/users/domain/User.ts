import { Email } from "./UserEmail";
import { UserId } from "./UserId";
import { UserUid } from "./UserUid";
import { UserPasword } from "./UserPassword";
import { TypeState } from "./UserTypeState";
import { UserCreateAt } from "./UserCreatedAt";

export class User {
    id: UserId;
    uid: UserUid;
    email: Email;
    password: UserPasword;
    idTypeState: TypeState;
    createAt: UserCreateAt;

    constructor(id :UserId,
        uid: UserUid,
        email: Email,
        password: UserPasword,
        idTypeState: TypeState,
        date: UserCreateAt
    ){
        this.id = id,
        this.uid = uid
        this.email = email,
        this.password = password,
        this.idTypeState = idTypeState
        this.createAt= date
    };    
}