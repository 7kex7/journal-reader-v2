import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum JournalStatus {
    NONE = "-",
    IN_WORK = "in work",
    FINISHED = "finished"
}

@Entity()
export class Authors {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 40})
    name: string
}