import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

import { Users } from "../entities/user.entity";
import { dataSource } from "../app-data-source";
import processApiError from "../error/processApiError"
import { ICustomRequest } from "../middlewares/authMiddleware";


async function createToken(id: string, name: string, email: string, is_admin: boolean): Promise<string> {
    const secretKey = process.env.SECRET_KEY as string | undefined;
    if (!secretKey) {
        throw new Error('Secret key is not defined');
    }
    return jwt.sign(
        {
            id,
            name,
            email,
            is_admin
        },
        secretKey,
        {expiresIn: '2 days'}
    )
}

interface IUserEntity {
    username: string;
    email: string;
    password: string;
    is_admin?: boolean;
}

interface IJwtPayload {
    id: string;
    name: string;
    email: string;
    is_admin: boolean;
} 

class userController {
    async registration(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {username, email, password } = req.body;
            if (!username || !email || !password) throw new Error('Нужно заполнить все поля')

            const is_admin: boolean = req.body.is_admin || false

            const is_exist = await dataSource.getRepository(Users).findOne({where: {email}})
            if (is_exist) throw new Error('Пользователь с таким email уже существует')

            const hashPassword: string = await bcrypt.hash(password, 5)

            const userObj: IUserEntity = {username, email, password: hashPassword, is_admin}
            const user: Users = await dataSource.getRepository(Users).create(userObj)
            await dataSource.getRepository(Users).save(user)

            const token: string = await createToken(user.id, user.username, user.email, user.is_admin)
            res.json(token)

        } catch (error: unknown) {
            processApiError(404, error, next)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            // получение данных
            const { email, password } = req.body
            if (!email || !password) throw new Error('Нужно заполнить все поля')
            // идентификация
            const user = await dataSource.getRepository(Users).findOneBy({
                email: email
            })
            if (!user) throw new Error('Пользователя с таким email не существует')
            // проверка пароля на валидность
            const valid: boolean = bcrypt.compareSync(password, user.password)
            if (!valid) throw new Error('Неверный пароль')
            // создание токена
            const token = await createToken(user.id, user.username, user.email, user.is_admin)
            res.json(token)

        } catch (error: unknown) {
            processApiError(404, error, next)
        }
    }

    // Метод отвечает за создание нового токена, продление жизни пользователя
    async check(req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
        const user = req.user as IJwtPayload;
        const userId = user.id;
        const userName = user.name;
        const userEmail = user.email;
        const userIsAdmin = user.is_admin;
        const token = await createToken(userId, userName, userEmail, userIsAdmin)
        res.json(token)
    }

    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string | undefined = typeof req.query.id === 'string' ? req.query.id : undefined;   
        
            if (!id) {
                throw Error("userController-findOne: не найден параметр id")
            }

            const user: Users | null = await dataSource.getRepository(Users).findOneBy({ id: id })
            if (!user) throw new Error('пользователя с таким id нет в системе')

            res.json(user)

        } catch (error: unknown) {
            processApiError(404, error, next)
        }
    }
}

export default new userController()