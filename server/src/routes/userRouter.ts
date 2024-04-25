import express, { Express, Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";
const userRouter: Express = express();

userRouter.get("/", async function (req: Request, res: Response) {
    const users: User[] = await myDataSource.getRepository(User).find()
    res.json(users)
})

userRouter.get("/:id", async function (req: Request, res: Response) {
    const results: User | null = await myDataSource.getRepository(User).findOneBy({
        id: req.params.id,
    })
    return res.send(results)
})

userRouter.post("/users", async function (req: Request, res: Response) {
    const user: User[] = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

userRouter.put("/:id", async function (req: Request, res: Response) {
    const user: User | null = await myDataSource.getRepository(User).findOneBy({
        id: req.params.id,
    })
    if (user !== null) {
        myDataSource.getRepository(User).merge(user, req.body)
        const results = await myDataSource.getRepository(User).save(user)
        return res.send(results)
    }
})

userRouter.delete("/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})

export default userRouter;
