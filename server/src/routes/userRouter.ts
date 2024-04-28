import express, { Express } from "express";
import UserController from "../controllers/userController";
import { authMiddleware, ICustomRequest } from "../middlewares/authMiddleware"

const userRouter: Express = express();

userRouter.get("/:id", UserController.findOne)
userRouter.get('/check', authMiddleware, async (req, res, next) => {
    await UserController.check(req as ICustomRequest, res, next);
});

userRouter.post("/registration", UserController.registration)
userRouter.post("/login", UserController.login)

export default userRouter;
