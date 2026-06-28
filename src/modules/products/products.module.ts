import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ProductColorVariant } from './entities/product-color-variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductColorVariant])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
