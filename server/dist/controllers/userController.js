"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../entities/user.entity");
const app_data_source_1 = require("../app-data-source");
const catchErrorProcessing_1 = __importDefault(require("../errors/catchErrorProcessing"));
function createToken(id, name, email, role) {
    return __awaiter(this, void 0, void 0, function* () {
        let secret_key = process.env.SECRET_KEY;
        secret_key = typeof secret_key === 'undefined' ? 'shhhh' : secret_key;
        return jsonwebtoken_1.default.sign({
            id,
            name,
            email,
            role
        }, secret_key, { expiresIn: '24h' });
    });
}
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                if (!username || !email || !password)
                    throw new Error('Нужно заполнить все поля');
                const is_admin = req.body.role || false;
                const is_exist = yield app_data_source_1.dataSource.getRepository(user_entity_1.Users).findOne({ where: { email } });
                if (is_exist)
                    throw new Error('Пользователь с таким email уже существует');
                const hashPassword = yield bcrypt.hash(password, 5);
                const userObj = { is_admin, username, email, password: hashPassword };
                const user = yield app_data_source_1.dataSource.getRepository(user_entity_1.Users).create(userObj);
                yield app_data_source_1.dataSource.getRepository(user_entity_1.Users).save(user);
                const token = yield createToken(user.id, user.username, user.email, user.is_admin);
                res.json(token);
            }
            catch (error) {
                (0, catchErrorProcessing_1.default)(error, next);
            }
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params) {
                    throw Error("userController-findOne: не найдено параметров");
                }
                if (!req.params.id) {
                    throw Error("userController-findOne: не найден параметр id");
                }
                const user = yield app_data_source_1.dataSource.getRepository(user_entity_1.Users).findOneBy({ id: req.params.id });
                if (!user)
                    throw new Error('пользователя с таким id нет в системе');
                res.json(user);
            }
            catch (error) {
                (0, catchErrorProcessing_1.default)(error, next);
            }
        });
    }
}
exports.default = new UserController();
