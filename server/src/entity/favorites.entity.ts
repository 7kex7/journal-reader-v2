import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class FavoriteJournal {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "int"})
    user_id: number

    @Column({type: "int"})
    journal_id: number
}

@Entity()
export class Favorites {
    @PrimaryGeneratedColumn()
    id: number
}