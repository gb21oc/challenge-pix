import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TraderEntity } from "./trader.entity";
import { UserEntity } from "./user.entity";
import { PIX_STATUS } from "src/common/enums/pix-status.enum";

@Entity("pix")
export class PixEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ nullable: true })
    userId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn([
        { name: 'userId', referencedColumnName: 'id' },
    ])
    user?: UserEntity;

    @Column({ nullable: true })
    traderId: string;

    @ManyToOne(() => TraderEntity)
    @JoinColumn([
        { name: 'traderId', referencedColumnName: 'id' },
    ])
    trader?: TraderEntity;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    amount: string

    @Column({ type: 'enum', enum: PIX_STATUS })
    status: PIX_STATUS;

    @Column()
    paymentId: string

    @Column()
    qrCode: string

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column({ type: 'timestamp' })
    expires_at: Date
}