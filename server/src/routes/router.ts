import express, { Express, Request, Response } from "express";
import userRouter from './userRouter'

const router: Express = express();

router.use('/users', userRouter)

export default router;