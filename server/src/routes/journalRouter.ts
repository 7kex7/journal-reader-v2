import express, { Express } from "express";
import journalController from "../controllers/journalController";
import { check } from '../middlewares/checkMiddleware'

const journalRouter: Express = express();

journalRouter.get("/", journalController.getAll)
journalRouter.get("/:id", journalController.getOne)

journalRouter.post("/create", check, journalController.create)  
journalRouter.post("/destroy", check, journalController.destroy)


export default journalRouter;
