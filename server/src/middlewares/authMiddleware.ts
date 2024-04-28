import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export interface ICustomRequest extends Request {
    user: string | JwtPayload;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') next()
    try {
        const token = req.header('authorization')?.replace('Bearer ', '')
        if (!token) throw new Error('не авторизован')

        const secretKey = process.env.SECRET_KEY as string | undefined
        if (!secretKey) {
            throw new Error('Secret key is not defined')
        }
        const decoded = jwt.verify(token, secretKey as Secret);

        (req as ICustomRequest).user = decoded
        next()
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.json({message: error.message})
        } else if (typeof error === 'string') {
            res.json({ message: error })
        }
    }
}