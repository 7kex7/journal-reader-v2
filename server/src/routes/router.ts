import express, { Express, Request, Response } from "express";
import userRouter from './userRouter'
import journalRouter from "./journalRouter";

const router: Express = express();

router.use('/users', userRouter)
router.use('/journals', journalRouter)

export default router;