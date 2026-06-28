import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItems } from './entities/order-items.entity';
import { ProductColorVariant } from 'src/modules/products/entities/product-color-variant.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItems)
    private orderItemsRepository: Repository<OrderItems>,
    @InjectRepository(ProductColorVariant)
    private productColorVariantRepository: Repository<ProductColorVariant>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { variant_id, quantity } = createOrderDto;

    const variant = await this.productColorVariantRepository.findOne({ where: { id: variant_id } });
    if (!variant) {
      throw new NotFoundException(`Product variant with id ${variant_id} not found`);
    }

    const order = this.orderRepository.create({
      items: [{ quantity, productColorVariant: variant }],
    });

    return this.orderRepository.save(order);
  }

  async findAll(query: any) {
    const { page, limit } = query;

    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const queryBuilder = this.orderItemsRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.order', 'order')
      .leftJoinAndSelect('item.productColorVariant', 'variant')
      .leftJoinAndSelect('variant.product', 'product')
      .leftJoinAndSelect('variant.product_color', 'product_color')
      .orderBy('order.created_at', 'DESC')
      .skip(skip)
      .take(pageSize);

    const [items, total] = await queryBuilder.getManyAndCount();

    const data = items.map((item) => ({
      id: item.order?.id,
      order_id: this.formatId('MY', item.order?.id),
      product_id: this.formatId('P', item.productColorVariant?.product?.id),
      product_name: item.productColorVariant?.product?.name,
      product_color: item.productColorVariant?.product_color?.name,
      order_status: item.order?.status,
      order_datetime: this.formatDatetime(item.order?.created_at),
    }));

    return { data, total };
  }

  private formatId(prefix: string, id: number, pad = 4): string {
    return `${prefix}${String(id).padStart(pad, '0')}`;
  }

  private formatDatetime(date: Date): string {
    return date?.toISOString().replace('T', ' ').substring(0, 19);
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, _updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    if (order.status === OrderStatus.COMPLETED) {
      throw new BadRequestException(`Order with id ${id} is already completed`);
    }

    order.status = OrderStatus.COMPLETED;

    return this.orderRepository.save(order);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
