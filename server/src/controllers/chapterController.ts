import { NextFunction, Request, Response } from "express"
import * as fs from "fs"
import * as path from "path"

import { dataSource } from "../app-data-source"
import { Journal } from "../entities/journal.entity"
import { Chapter } from "../entities/chapter.entity"
import { CustomFileType } from "../domain/customTypes"
import processApiError from "../error/processApiError"

interface IChapterCreation {
    name: string
    size: number
    serial_number: number
}

class chapterController {
    async create(req: Request, res: Response, next: NextFunction) {
        // journalId, pages(files), chapterName
        try {
            // получение журнала
            const journalId: string | undefined = req.body.journalId
            if (!journalId) {
                throw new Error("не указано имя или id журнала")
            }
            const journal: Journal | null = await dataSource.getRepository(Journal)
                                            .findOne({
                                                relations: {chapters: true},
                                                where: {id: journalId}
                                            })
            if (!journal) {
                throw new Error('журнала с таким id не существует')
            }

            // получение порядкового номера главы
            const serialNumber: any = req.body.serialNumber || journal.number_of_chapters + 1
            if (isNaN(serialNumber)) {
                throw new Error('номер главы должен быть числом')
            }
                    
            // получение имени папки журнала
            const journalFolderName: string = journal.title.replace(/\s/g, '_')

            // получение страниц с клиента
            const pages: CustomFileType = req.files?.pages
            if (!pages) throw new Error('нужно добавить страницы')

            // проверка путей
            const pathToPublic: string = path.join(__dirname, "..", "..", "public")
            if (!pathToPublic) {
                throw new Error("папка public не найдена") 
            }
            const pathToJournal: string = path.join(__dirname, "..", "..", "public", journalFolderName)
            if (!fs.existsSync(pathToJournal)) { 
                throw new Error("папка журнала не найдена") 
            }
            const path_to_chapter: string = path.join(pathToJournal, serialNumber + '')
            if (fs.existsSync(journalFolderName)) {
                throw new Error("глава с таким номером уже есть на сервере")
            }

            // добавление главы в базу
            const chapterName: string = req.body.chapterName || (serialNumber + "")
            const size: number = Array.isArray(pages) ? pages.length : 1
            const rawChapter: IChapterCreation = {name: chapterName, size, serial_number: serialNumber}
            const chapter = await dataSource.getRepository(Chapter).create(rawChapter)
            
            // обновление полей journal
            ++journal.number_of_chapters
            journal.chapters.push(chapter)
            await dataSource.getRepository(Chapter).save(chapter)
            await dataSource.getRepository(Journal).save(journal)

            // создание папки главы
            fs.mkdirSync(path_to_chapter)
            // помещение страниц в папку
            if (!Array.isArray(pages)) {
                pages.mv(path.join(path_to_chapter, '1.jpg'))
            } else {
                pages.forEach((page, index) => {
                    page.mv(path.join(path_to_chapter, `${index + 1}.jpg`))
                })
            }

            res.json(chapter)

        } catch (error) {
            processApiError(404, error, next)
        }
    }
}

export default new chapterController()
