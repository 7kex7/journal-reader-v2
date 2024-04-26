import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum JournalStatus {
    NONE = "-",
    IN_WORK = "in work",
    FINISHED = "finished"
}

export enum JournalGenre {
    
}

@Entity()
export class Journal {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 40})
    title: string

    @Column({type: "varchar", length: 40, default: "incognito"})
    author: string

    @Column({type: "varchar", length: 40, default: "-"})
    genre: string

    @Column({type: "varchar", length: 40, default: "default"})
    cover: string

    @Column({type: "int"})
    year: string

    @Column({type: "text"})
    description: string

    @Column({type: "enum", enum: JournalStatus, default: JournalStatus.NONE})
    status: string
}