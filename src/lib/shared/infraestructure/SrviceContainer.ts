import { UserGetAll } from "../../users/aplication/User/UserGetAll";
import { InMemoryRepository } from "../../users/infraestructure/InMemoryRepository";
import {UserGetOneById} from "../../users/aplication/User/UserGetOneById"
import { UserCreate } from "../../users/aplication/User/UserCreate";
import {EditUser} from "../../users/aplication/User/UserEdit"
import { UserDelete } from "../../users/aplication/User/userDelete";
const userRepository = new InMemoryRepository();

export const ServiceContainer = {
    user:{
        getAll: new UserGetAll(userRepository),
        getOneById: new UserGetOneById(userRepository),
        create: new UserCreate(userRepository),
        edit: new EditUser(userRepository),
        delete: new UserDelete(userRepository)
    }
}
