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
const app_data_source_1 = require("./app-data-source");
const router_1 = __importDefault(require("./routes/router"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 5001;
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.static('static'));
app.use('/api', router_1.default);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app_data_source_1.dataSource
                .initialize()
                .then(() => {
                console.log("Data Source has been initialized!");
            })
                .catch((err) => {
                console.error("Error during Data Source initialization:", err);
            });
            app.listen(port, () => {
                console.log(`[server]: Server is running at http://localhost:${port}`);
            });
        }
        catch (error) {
            if (typeof error === "string") {
                console.log(error.toUpperCase());
            }
            else if (error instanceof Error) {
                console.log(error.message);
            }
        }
    });
}
start();
