import { Pool, Query } from "pg";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { text } from "stream/consumers";
import { UserId } from "../domain/UserId";
import { UserUid } from "../domain/UserUid";
import { Email } from "../domain/UserEmail";
import { UserPasword } from "../domain/UserPassword";
import { TypeState } from "../domain/UserTypeState";
import { UserCreateAt } from "../domain/UserCreatedAt";


type PostgresUser = {
id:number,
uid: string,
email:string,
password: string,
typestate: number,
createdAt: Date
}

export class PostgresUserRepository implements UserRepository {
    client : Pool;
    constructor(databaseurl:string){
        this.client = new Pool({
            connectionString: databaseurl,
        }
        )
    }

    async create(user: User): Promise<void> {
        const query = {
            text: "INSERT INTO users (id,uid,email,password,typestate_id,created_at) VALUES ($1,$2,$3,$4,$5,$6)",
            value: [user.id.value, user.uid.value, user.email.value, user.idTypeState.value, user.idTypeState.value]
        };
        await this.client.query(query)
    }
    async getAll(): Promise<User[]> {
    const query = {
        text: "SELECT * FROM users;"
    };
    const result = await this.client.query<PostgresUser>(query)
    return result.rows.map((row)=>new User(new UserId(row.id),new UserUid(row.uid),new Email( row.email),new UserPasword( row.password),new TypeState(row.typestate),new UserCreateAt( row.createdAt)))
    }
    
    async edit(user: User): Promise<void> {
        const query = {
            text: "SET UPDATE users ",
            value: [],
        }
    }


    async getOneById(id: UserId): Promise<User | null> {
        const query = {
            text: "SELECT * FROM users WHERE id = $1",
            value: [id.value]
        }
        
        const result = await this.client.query<PostgresUser>(query);
        if(result.rows.length === 0){
            return null;
        }
        
        const row = result.rows[0];
        return new User(new UserId(row.id),new UserUid(row.uid), new Email(row.email), new UserPasword(row.password), new TypeState(row.typestate), new UserCreateAt(row.createdAt)) ;
    }

    async delete(id: UserId): Promise<void> {
        const query = {
            text : "delete from users where id = $1",
            value: [id.value]
        }

        await this.client.query(query);
    }
}