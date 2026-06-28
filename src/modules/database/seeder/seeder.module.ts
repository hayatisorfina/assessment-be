import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/modules/categories/entities/category.entity';
import { SeederService } from './seeder.service';
import { ProductColor } from 'src/modules/product-colors/entities/product-color.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Brand } from 'src/modules/brands/entities/brand.entity';
import { ProductColorVariant } from 'src/modules/products/entities/product-color-variant.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { OrderItems } from 'src/modules/orders/entities/order-items.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-damp-union-aobmg34s-pooler.c-2.ap-southeast-1.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'npg_LVkCSx4eJX2O',
      database: 'neondb',
      entities: [Category, Brand, Product, ProductColor, ProductColorVariant, Order, OrderItems],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([Category, Brand, Product, ProductColor, ProductColorVariant, Order, OrderItems]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
