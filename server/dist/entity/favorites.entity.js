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
exports.FavoriteJournals = exports.Favorites = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const journal_entity_1 = require("./journal.entity");
let Favorites = class Favorites {
};
exports.Favorites = Favorites;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Favorites.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.Users, (users) => users.favorites),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.Users)
], Favorites.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FavoriteJournals, (favoriteJournal) => favoriteJournal.favorites),
    __metadata("design:type", Array)
], Favorites.prototype, "favoriteJournal", void 0);
exports.Favorites = Favorites = __decorate([
    (0, typeorm_1.Entity)()
], Favorites);
let FavoriteJournals = class FavoriteJournals {
};
exports.FavoriteJournals = FavoriteJournals;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FavoriteJournals.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Favorites, (favorites) => favorites.favoriteJournal),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Favorites)
], FavoriteJournals.prototype, "favorites", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => journal_entity_1.Journals),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", journal_entity_1.Journals)
], FavoriteJournals.prototype, "journal", void 0);
exports.FavoriteJournals = FavoriteJournals = __decorate([
    (0, typeorm_1.Entity)()
], FavoriteJournals);
