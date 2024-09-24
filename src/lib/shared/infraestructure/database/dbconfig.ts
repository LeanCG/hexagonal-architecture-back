import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();   

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
    throw new Error('Missing database configuration environment variables.');
}
// Crear la instancia de Sequelize con el dialecto explícito
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres', 
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});