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
created_at: Date
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
        
        return result.rows.map(
            (row)=> this.mapToDomain(row)
            )
    }
    
    async edit(user: User): Promise<void> {
        const query = {
            text: "SET UPDATE users SET password = $1, email = $2 typestate_id WHERE id=$3",
            value: [user.email.value, user.password.value,user.idTypeState.value  ],
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
        return this.mapToDomain(row);
    }

    async delete(id: UserId): Promise<void> {
        const query = {
            text : "delete from users where id = $1",
            value: [id.value]
        }

        await this.client.query(query);
    }

    private mapToDomain(user: PostgresUser):User{
        return new User(
            new UserId(user.id),
            new UserUid(user.uid), 
            new Email(user.email), 
            new UserPasword(user.password), 
            new TypeState(user.typestate), 
            new UserCreateAt(user.created_at))}
    }