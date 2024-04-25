import express, { Express, Request, Response } from "express";
import { DeleteResult } from "typeorm";
import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";
const userRouter: Express = express();

// create and setup express app
const app = express()
app.use(express.json())

app.get('/home')

export default userRouter;
