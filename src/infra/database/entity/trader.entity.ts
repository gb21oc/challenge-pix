import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TraderEntity {
    @PrimaryColumn("uuid")
    readonly id: string

    @Column({ unique: true })
    readonly cnpj: string

    @Column({ unique: true })
    readonly email: string

    @Column()
    readonly password: string

    @Column()
    readonly fullName: string
}