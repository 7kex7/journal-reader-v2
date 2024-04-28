import { Entity,
        Column,
        PrimaryGeneratedColumn,
        ManyToOne,
        JoinColumn
    } from "typeorm"
import { Journals } from "./journal.entity"

@Entity()
export class Chapters {
    @PrimaryGeneratedColumn()
    id: string

    @Column({type: "varchar", length: 50})
    name: string

    @Column({type: "int"})
    size: number

    @Column({type: "int"})
    serial_number: number

    @Column({type: "int"})
    year: number

    @ManyToOne(() => Journals, (journal) => journal.chapters)  
    @JoinColumn()
    journal: Journals;
}