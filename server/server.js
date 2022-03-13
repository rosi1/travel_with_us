import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import db from './config/db.js'
import axios from 'axios';

dotenv.config();
const app = express();

try{
  await db.authenticate();
  console.log('Authenticated')
}catch(err){
  console.log(err)
}

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);




app.listen(process.env.PORT, ()=> {
    console.log(`server running at port ${process.env.PORT}`)
  })