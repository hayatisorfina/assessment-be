import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Order } from './entities/order.entity';
import { OrderItems } from './entities/order-items.entity';
import { ProductColorVariant } from 'src/modules/products/entities/product-color-variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItems, ProductColorVariant])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
