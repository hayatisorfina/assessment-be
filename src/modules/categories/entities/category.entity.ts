import { Brand } from '../../brands/entities/brand.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  updated_at?: Date;

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  deleted_at?: Date;

  @OneToMany(() => Brand, (brand) => brand.category, { cascade: true })
  brands: Brand[];
}
