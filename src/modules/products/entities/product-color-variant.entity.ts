import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductColor } from 'src/modules/product-colors/entities/product-color.entity';

@Entity('product_color_variants')
export class ProductColorVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.color_variants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => ProductColor, { eager: true })
  @JoinColumn({ name: 'product_color_id' })
  product_color: ProductColor;
}
