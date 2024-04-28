import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm"
import { Journals } from "./journal.entity"

@Entity()
export class Genres {
    @PrimaryGeneratedColumn()
    id: string

    @Column({type: "varchar", length: 20})
    name: string

    @OneToMany(() => Journals, (journal) => journal.genre)
    journals: Journals[]
}