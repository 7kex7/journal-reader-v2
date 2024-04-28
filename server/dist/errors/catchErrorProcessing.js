"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("./apiError"));
function processCatchError(error, next) {
    if (typeof error === "string") {
        next(apiError_1.default.badRequest(error));
    }
    else if (error instanceof Error) {
        next(apiError_1.default.badRequest(error.message));
    }
}
exports.default = processCatchError;
