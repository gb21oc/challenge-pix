import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TraderEntity {
    @PrimaryColumn()
    readonly cnpj: string

    @PrimaryColumn()
    readonly email: string

    @Column()
    readonly password: string

    @Column()
    readonly fullName: string
}