import { Entity,
        Column,
        PrimaryGeneratedColumn,
        OneToMany,
        ManyToOne,
        JoinColumn,
        CreateDateColumn,
        UpdateDateColumn,
        OneToOne, 
        ManyToMany
    } from "typeorm"
import { Chapters } from "./chapter.entity"
import { Authors } from "./author.entity"
import { FavoriteJournals } from "./favorites.entity"
import { Genres } from "./genre.entity"

export enum JournalStatus {
    NONE = "-",
    IN_WORK = "in work",
    FINISHED = "finished"
}

@Entity()
export class Journals {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 40})
    title: string

    @Column({type: "varchar", length: 40, default: "default"})
    cover: string

    @Column({type: "int"})
    year: string

    @Column({type: "text"})
    description: string

    @Column({type: "enum", enum: JournalStatus, default: JournalStatus.NONE})
    status: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Genres, (genre) => genre.journals)
    @JoinColumn()
    genre: Genres

    @ManyToMany(() => Authors)
    @JoinColumn()
    authors: Authors[];

    @OneToMany(() => Chapters, (chapter) => chapter.journal, {
        onDelete: "CASCADE" // delete chapters if journal is deleted
    })
    chapters: Chapters[];

    @OneToOne(() => FavoriteJournals, { onDelete: "CASCADE" })
    favoriteJournal: FavoriteJournals
}