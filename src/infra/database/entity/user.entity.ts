import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryColumn()
    readonly cpf: number

    @PrimaryColumn()
    readonly email: string

    @Column()
    readonly password: string

    @Column()
    readonly fullName: string
}