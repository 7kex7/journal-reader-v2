import { Entity,
        PrimaryGeneratedColumn,
        JoinColumn,
        OneToOne,
        OneToMany,
        ManyToOne
    } from "typeorm"
import { Users } from "./user.entity"
import { Journals } from "./journal.entity"

@Entity()
export class Favorites {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Users, (users) => users.favorites)
    @JoinColumn()
    user: Users

    @OneToMany(() => FavoriteJournals, (favoriteJournal) => favoriteJournal.favorites)
    favoriteJournal: FavoriteJournals[]
}

@Entity()
export class FavoriteJournals {
    @PrimaryGeneratedColumn()
    id: number
    
    @ManyToOne(() => Favorites, (favorites) => favorites.favoriteJournal)
    @JoinColumn()
    favorites: Favorites

    @OneToOne(() => Journals)
    @JoinColumn()
    journal: Journals
}