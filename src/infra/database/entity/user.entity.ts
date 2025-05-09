import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryColumn("uuid")
    readonly id: string

    @Column({ unique: true })
    readonly cpf: string

    @Column({ unique: true })
    readonly email: string

    @Column()
    readonly password: string

    @Column()
    readonly fullName: string
}