"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_data_source_1 = require("../app-data-source");
const user_entity_1 = require("../entity/user.entity");
const userRouter = (0, express_1.default)();
userRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield app_data_source_1.myDataSource.getRepository(user_entity_1.Users).find();
        res.json(users);
    });
});
userRouter.get("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
});
userRouter.post("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield app_data_source_1.myDataSource.getRepository(user_entity_1.Users).create(req.body);
        const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.Users).save(user);
        return res.send(results);
    });
});
userRouter.put("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
});
userRouter.delete("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield app_data_source_1.myDataSource.getRepository(user_entity_1.Users).delete(req.params.id);
        return res.send(results);
    });
});
exports.default = userRouter;
