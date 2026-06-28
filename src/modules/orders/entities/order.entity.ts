import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItems } from './order-items.entity';

export enum OrderStatus {
  OPEN = 'Open',
  COMPLETED = 'Completed',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OPEN,
  })
  status: OrderStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => OrderItems, (item) => item.order, { cascade: true })
  items: OrderItems[];

  // @Column()
  // quantity: number;
}
