import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
   { 
       host:'localhost', 
       port:'5000',
       dialect:'postgres'
    } 
);

export default db;