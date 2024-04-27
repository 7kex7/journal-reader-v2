"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Journals = exports.JournalStatus = void 0;
const typeorm_1 = require("typeorm");
const chapter_entity_1 = require("./chapter.entity");
const author_entity_1 = require("./author.entity");
const favorites_entity_1 = require("./favorites.entity");
const genre_entity_1 = require("./genre.entity");
var JournalStatus;
(function (JournalStatus) {
    JournalStatus["NONE"] = "-";
    JournalStatus["IN_WORK"] = "in work";
    JournalStatus["FINISHED"] = "finished";
})(JournalStatus || (exports.JournalStatus = JournalStatus = {}));
let Journals = class Journals {
};
exports.Journals = Journals;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Journals.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40 }),
    __metadata("design:type", String)
], Journals.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40, default: "default" }),
    __metadata("design:type", String)
], Journals.prototype, "cover", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", String)
], Journals.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Journals.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: JournalStatus, default: JournalStatus.NONE }),
    __metadata("design:type", String)
], Journals.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Journals.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Journals.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => genre_entity_1.Genres, (genre) => genre.journals),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", genre_entity_1.Genres)
], Journals.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => author_entity_1.Authors),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Journals.prototype, "authors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chapter_entity_1.Chapters, (chapter) => chapter.journal, {
        onDelete: "CASCADE" // delete chapters if journal is deleted
    }),
    __metadata("design:type", Array)
], Journals.prototype, "chapters", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => favorites_entity_1.FavoriteJournals, { onDelete: "CASCADE" }),
    __metadata("design:type", favorites_entity_1.FavoriteJournals)
], Journals.prototype, "favoriteJournal", void 0);
exports.Journals = Journals = __decorate([
    (0, typeorm_1.Entity)()
], Journals);
