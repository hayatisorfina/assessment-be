import { Brand } from 'src/modules/brands/entities/brand.entity';
import { ProductColor } from 'src/modules/product-colors/entities/product-color.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ProductColorVariant } from './product-color-variant.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  //   @ManyToMany(() => ProductColor, (productColor) => productColor.products, {
  //     cascade: true, // Optional: Saves/updates colors automatically when saving a product
  //   })
  //   @JoinTable({
  //     name: 'product_color_variants', // Custom name for your junction table
  //     joinColumn: { name: 'product_id', referencedColumnName: 'id' },
  //     inverseJoinColumn: { name: 'product_color_id', referencedColumnName: 'id' },
  //   })
  //   product_colors: ProductColor[];

  @OneToMany(() => ProductColorVariant, (variant) => variant.product)
  color_variants: ProductColorVariant[];

  @CreateDateColumn({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  updated_at?: Date;

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  deleted_at?: Date;
}
