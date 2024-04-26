import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"

export const myDataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "journals",
    password: "1234",
    synchronize: true,
    entities: [
        User,
    ]
})