import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TraderEntity } from './trader.entity';
import { PIX_TYPE_ENUM } from 'src/common/enums';

@Entity('pix')
export class PixEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    userId?: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn([
        { name: 'userId', referencedColumnName: 'id' },
    ])
    user?: UserEntity;

    @Column({ nullable: true })
    traderId?: string;

    @ManyToOne(() => TraderEntity)
    @JoinColumn([
        { name: 'traderId', referencedColumnName: 'id' },
    ])
    trader?: TraderEntity;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 100 })
    balance: string;

    @Column({ type: 'enum', enum: PIX_TYPE_ENUM })
    type: PIX_TYPE_ENUM;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;
}
