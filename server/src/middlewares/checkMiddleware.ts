import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { ICustomRequest } from "./authMiddleware";
import { dataSource } from "../app-data-source";
import { User } from "../entities/user.entity";

export const check = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') next()
    try {
        const token: string | undefined = req.header('authorization')?.replace('Bearer ', '')
        if (!token) { res.status(401).json({message: 'не авторизован'}) }
        else {
            const secretKey = process.env.SECRET_KEY as string | undefined
            if (!secretKey) {
                throw new Error('SECRET_KEY не найден')
            }
            const decoded: string | JwtPayload = jwt.verify(token, secretKey as Secret);
            if (typeof decoded === 'string') {
                throw new Error(decoded)
            } else {
                if (!decoded.is_admin) throw new Error('user не имеет достаточно прав')
            }

            (req as ICustomRequest).user = decoded
            next()
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.json({message: 'checkAdmin: ' + error.message})
        } else if (typeof error === 'string') {
            res.json({ message: error })
        }
    }
}
