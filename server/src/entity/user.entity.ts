import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn({})
    id: string

    @Column({type: "varchar", length: 20, unique: false})
    firstName: string

    @Column({type: "varchar", length: 20, unique: false})
    lastName: string
}