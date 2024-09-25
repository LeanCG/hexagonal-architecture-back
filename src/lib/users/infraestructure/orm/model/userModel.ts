import { Model,DataTypes, Sequelize,Optional } from "sequelize";
import {sequelize} from "../../../../shared/infraestructure/database/dbconfig"


interface UserAttributes  {
    id:number,
    uid: string,
    email:string,
    password: string,
    typestate: number
    }
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'uid' | 'typestate'> {}

class UserModel extends Model <UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!:number;
    public uid!: string;
    public email!:string;
    public password!: string;
    public typestate!: number;
}


// Inicialización del modelo
UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        typestate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    
    },
    {
        sequelize, // la instancia de sequelize
        tableName: 'user',
        timestamps: true,
    }
);

// Sincronización del modelo
UserModel.sync({ alter: true, force: true })
    .then(() => {
        console.log("User table created");
    })
    .catch((error) => {
        console.log("Error al crear la tabla User", error);
    });

export default UserModel;