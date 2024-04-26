import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Chapter {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 50})
    name: string

    @Column({type: "int"})
    size: number

    @Column({type: "int"})
    serial_number: number

    @Column({type: "int"})
    year: number
}