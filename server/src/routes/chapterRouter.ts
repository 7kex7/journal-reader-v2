import express, { Express } from "express";
import { check } from "../middlewares/checkMiddleware";
import chapterController from "../controllers/chapterController";

const chapterRouter: Express = express();

// journalRouter.get("/:id", journalController.getOne)
// journalRouter.get("/", journalController.getAll)
// journalRouter.post("/filter", journalController.getFilterData)

chapterRouter.post("/create", check, chapterController.create)
// journalRouter.post("/delete", check, journalController.destroy)

export default chapterRouter;
