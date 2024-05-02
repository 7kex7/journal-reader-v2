import { Entity,
        Column,
        PrimaryGeneratedColumn,
        OneToMany,
        JoinColumn,
        CreateDateColumn,
        UpdateDateColumn,
        OneToOne, 
        ManyToMany,
        JoinTable
    } from "typeorm"
import { Chapters } from "./chapter.entity"
import { Authors } from "./author.entity"
import { FavoriteJournals } from "./favorites.entity"
import { Genres } from "./genre.entity"


@Entity()
export class Journals {
    @PrimaryGeneratedColumn()
    id: string

    @Column({type: "varchar", length: 40})
    title: string

    @Column({type: "int"})
    year: number

    @Column({type: "text"})
    description: string

    @Column({type: "varchar", length: 40})
    status: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(() => Genres)
    @JoinTable()
    genres: Genres[]

    @ManyToMany(() => Authors)
    @JoinTable()
    authors: Authors[];

    @OneToMany(() => Chapters, (chapter) => chapter.journal, {
        onDelete: "CASCADE" // delete chapters if journal is deleted
    })
    chapters: Chapters[];

    @OneToOne(() => FavoriteJournals, { onDelete: "CASCADE" })
    favoriteJournal: FavoriteJournals
}