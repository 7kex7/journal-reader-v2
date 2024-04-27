"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const favorites_entity_1 = require("./entity/favorites.entity");
const chapter_entity_1 = require("./entity/chapter.entity");
const author_entity_1 = require("./entity/author.entity");
const genre_entity_1 = require("./entity/genre.entity");
const journal_entity_1 = require("./entity/journal.entity");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "journals",
    password: "1234",
    synchronize: true,
    entities: [
        user_entity_1.Users,
        genre_entity_1.Genres,
        author_entity_1.Authors,
        journal_entity_1.Journals,
        chapter_entity_1.Chapters,
        favorites_entity_1.Favorites,
        favorites_entity_1.FavoriteJournals,
    ]
});
