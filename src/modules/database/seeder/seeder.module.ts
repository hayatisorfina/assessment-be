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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Category, Brand, Product, ProductColor, ProductColorVariant, Order, OrderItems],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([Category, Brand, Product, ProductColor, ProductColorVariant, Order, OrderItems]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
