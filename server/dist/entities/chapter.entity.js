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
exports.Chapters = void 0;
const typeorm_1 = require("typeorm");
const journal_entity_1 = require("./journal.entity");
let Chapters = class Chapters {
};
exports.Chapters = Chapters;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Chapters.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Chapters.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Chapters.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Chapters.prototype, "serial_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Chapters.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => journal_entity_1.Journals, (journal) => journal.chapters),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", journal_entity_1.Journals)
], Chapters.prototype, "journal", void 0);
exports.Chapters = Chapters = __decorate([
    (0, typeorm_1.Entity)()
], Chapters);