import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "enum", enum: UserRole, default: UserRole.GUEST})
    role: UserRole

    @Column({type: "varchar", length: 40})
    username: string

    @Column({type: "varchar", length: 40})
    email: string

    @Column({type: "varchar", length: 200})
    password: string

    @Column({type: "varchar", length: 200})
    photo: string

    // @OneToOne(() => )
}