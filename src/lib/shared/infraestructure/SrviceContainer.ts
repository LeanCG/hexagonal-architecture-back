import { UserGetAll } from "../../users/aplication/User/UserGetAll";
import {UserGetOneById} from "../../users/aplication/User/UserGetOneById"
import { UserCreate } from "../../users/aplication/User/UserCreate";
import {EditUser} from "../../users/aplication/User/UserEdit"
import { UserDelete } from "../../users/aplication/User/userDelete";
import { UserORMRepository } from "../../users/infraestructure/orm/repositories/OrmUserRepository";
const userRepository = new UserORMRepository();

export const ServiceContainer = {
    user:{
        getAll: new UserGetAll(userRepository),
        getOneById: new UserGetOneById(userRepository),
        create: new UserCreate(userRepository),
        edit: new EditUser(userRepository),
        delete: new UserDelete(userRepository)
    }
}
