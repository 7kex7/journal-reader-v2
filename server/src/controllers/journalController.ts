import { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as fs from "fs"
import * as path from "path"

import { Journals } from "../entities/journal.entity";
import { dataSource } from "../app-data-source";
import processApiError from "../error/processApiError"
import { Genres } from "../entities/genre.entity";
import { Authors } from "../entities/author.entity";

class IJournalEntity {
    title: string;
    year: number;
    description: string;
    status: string;
}

type CoverFileType = fileUpload.UploadedFile | fileUpload.UploadedFile[] | undefined

async function AddGenres(genres: string, journalId: string) {
    if (typeof genres === 'string' && genres.length) {
        genres = JSON.parse(genres)
        for (let i = 0; i < genres.length; i++) {
            let genre: Genres | null = await dataSource.getRepository(Genres).findOneBy({name: genres[i]})
            if (!genre) {
                const newGenre = dataSource.getRepository(Genres).create({name: genres[i]})
                await dataSource.getRepository(Genres).save(newGenre)
                // Добавляем жанр к журналу через связь ManyToMany
                const journal = await dataSource.getRepository(Journals).findOneBy({ id: journalId })
                if (journal) {
                    journal.genres = [...journal.genres, newGenre]
                    await dataSource.getRepository(Journals).save(journal)
                }

            } else {
                // Если жанр уже существует, добавляем его к журналу через связь ManyToMany
                const journal = await dataSource.getRepository(Journals).findOneBy({ id: journalId })
                if (journal) {
                    journal.genres = [...journal.genres, genre]
                    await dataSource.getRepository(Journals).save(journal)
                }
            }
        }
    }
}

async function AddAuthors(authors: string, journalId: string) {
    if (typeof authors === 'string' && authors.length) {
        authors = JSON.parse(authors)
        for (let i = 0; i < authors.length; i++) {
            let author: Authors | null = await dataSource.getRepository(Authors).findOneBy({name: authors[i]})
            if (!author) {
                const newAuthor = dataSource.getRepository(Authors).create({name: authors[i]})
                await dataSource.getRepository(Authors).save(newAuthor)
                // Добавляем автора к журналу через связь ManyToMany
                const journal = await dataSource.getRepository(Journals).findOneBy({ id: journalId })
                if (journal) {
                    journal.authors = [...journal.authors, newAuthor]
                    await dataSource.getRepository(Journals).save(journal)
                }
            } else {
                // Если автор уже существует, добавляем его к журналу через связь ManyToMany
                const journal = await dataSource.getRepository(Journals).findOneBy({ id: journalId })
                if (journal) {
                    journal.authors = [...journal.authors, author]
                    await dataSource.getRepository(Journals).save(journal)
                }
            }
        }
    }
}

class journalController {
    async create(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {title, status, description} = req.body
            const year: number = req.body.year;

            if (!title || !year || !status || !description) throw new Error('нужно заполнить все обязательные поля')
            
            const folderName: string = title.replace(/\s/g, '_')
            if (!fs.existsSync(path.join(__dirname, "../../public"))) {
                fs.mkdirSync(path.join(__dirname, "../../public"));
            }
            const folderPath: string = path.join(__dirname, "../../public", folderName)
            if (fs.existsSync(folderPath)) {
                throw new Error("Произведение с таким названием уже существует")
            }
            fs.mkdirSync(folderPath)
            
            const coverImg: CoverFileType = req.files?.coverImg
            if (coverImg) {
                if (Array.isArray(coverImg)) {
                    throw new Error("загрузите только 1 файл")
                }
                coverImg.mv(path.join(folderPath, "cover.jpeg"), e => console.error(e))
            } else {
                throw new Error("загрузите обложку")
            }

            const journal_en: IJournalEntity = {title, year, description, status}
            const journal = await dataSource.getRepository(Journals).create(journal_en)
            await dataSource.getRepository(Journals).save(journal)

            // Жанры, как и авторы, будут приходить 
            // в формате json {genres: '["жанр 1", "жанр 2"]', ...}
            let genres: string | undefined = req.body.genres
            if (genres)
                AddGenres(genres, journal.id)
            let authors: string | undefined = req.body.authors
            if (authors)
                AddAuthors(authors, journal.id)

            res.json(journal)

        } catch (error: unknown) {
            processApiError(404, error, next)
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            

        } catch (error: unknown) {
            processApiError(404, error, next)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            

        } catch (error: unknown) {
            processApiError(404, error, next)
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const id: string = req.params.id
            const journal: Journals | null = await dataSource.getRepository(Journals).findOne({
                where: {id: id}, relations: {genres: true, authors: true}
            });
            if (!journal) throw new Error('не найдено')

            res.json(journal)

        } catch (error: unknown) {
            processApiError(404, error, next)
        }
    }
}

export default new journalController()