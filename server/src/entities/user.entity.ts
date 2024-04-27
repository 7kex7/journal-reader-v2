import { Entity,
     Column,
     PrimaryGeneratedColumn,
     OneToOne
 } from "typeorm"
import { Favorites } from "./favorites.entity"

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "enum", enum: UserRole
                , default: UserRole.GUEST})
    role: UserRole

    @Column({type: "varchar", length: 40})
    username: string

    @Column({type: "varchar", length: 40})
    email: string

    @Column({type: "varchar", length: 200})
    password: string

    @Column({type: "varchar", length: 200})
    photo: string

    @OneToOne(() => Favorites, (favorites) => favorites.user
                , {onDelete: "CASCADE"})
    favorites: Favorites
}