import { ProductColorVariant } from 'src/modules/products/entities/product-color-variant.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @ManyToMany(() => Product, (product) => product.product_colors)
  // products: Product[];

  @OneToMany(() => ProductColorVariant, (variant) => variant.product_color)
  color_variants: ProductColorVariant[];

  @Column({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  updated_at?: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deleted_at?: Date;
}
