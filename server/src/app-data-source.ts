import { DataSource } from "typeorm"
import { Users } from "./entities/user.entity"
import { FavoriteJournals, Favorites } from "./entities/favorites.entity"
import { Chapters } from "./entities/chapter.entity"
import { Authors } from "./entities/author.entity"
import { Genres } from "./entities/genre.entity"
import { Journals } from "./entities/journal.entity"

export const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "journal_db",
    password: "1234",
    synchronize: true,
    entities: [
        Users,
        Genres,
        Authors,
        Journals,
        Chapters,
        Favorites,
        FavoriteJournals,
    ]
})