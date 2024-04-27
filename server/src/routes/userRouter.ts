import express, { Express, NextFunction, Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { Users } from "../entities/user.entity";
const userRouter: Express = express();

userRouter.get("/", async function (req: Request, res: Response) {
    const users: Users[] = await myDataSource.getRepository(Users).find()
    res.json(users)
})

userRouter.post("/", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(Users).create(req.body)
    const results = await myDataSource.getRepository(Users).save(user)
    return res.send(results)
})

export default userRouter;
