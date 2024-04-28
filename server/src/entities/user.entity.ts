import { Entity,
        Column,
        PrimaryGeneratedColumn,
        OneToOne
    } from "typeorm"
import { Favorites } from "./favorites.entity"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: string

    @Column({type: "bool", default: false})
    is_admin: boolean

    @Column({type: "varchar", length: 40})
    username: string

    @Column({type: "varchar", length: 40})
    email: string

    @Column({type: "varchar", length: 200})
    password: string

    @Column({type: "varchar", length: 200, default: "default"})
    photo: string

    @OneToOne(() => Favorites, (favorites) => favorites.user
                , {onDelete: "CASCADE"})
    favorites: Favorites
}