"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "journals",
    password: "1234",
    synchronize: true,
    entities: [
        user_entity_1.User,
    ],
});
