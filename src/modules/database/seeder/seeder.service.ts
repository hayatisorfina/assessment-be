// seeder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Brand } from 'src/modules/brands/entities/brand.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductColor } from 'src/modules/product-colors/entities/product-color.entity';
import { ProductColorVariant } from 'src/modules/products/entities/product-color-variant.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { OrderItems } from 'src/modules/orders/entities/order-items.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(ProductColor) private productColorRepo: Repository<ProductColor>,
    @InjectRepository(ProductColorVariant) private productColorVariantRepo: Repository<ProductColorVariant>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItems) private orderItemsRepo: Repository<OrderItems>,
  ) {}

  async run() {
    console.log('🌱 Starting database seeding...');

    await this.productColorVariantRepo.query('TRUNCATE TABLE product_color_variants CASCADE;');
    await this.categoryRepo.query('TRUNCATE TABLE category CASCADE;');
    await this.brandRepo.query('TRUNCATE TABLE brand CASCADE;');
    await this.productRepo.query('TRUNCATE TABLE product CASCADE;');
    await this.productColorRepo.query('TRUNCATE TABLE product_color CASCADE;');
    await this.orderRepo.query('TRUNCATE TABLE "order" CASCADE;');
    await this.orderItemsRepo.query('TRUNCATE TABLE order_items CASCADE;');

    // 1. Seed Categories

    const categories = [{ name: 'Smartphones' }, { name: 'Tablets' }];

    const savedCategories = await this.categoryRepo.save(categories);
    const [smartPhone, tablet] = savedCategories;

    // 2. Seed Brands

    const brands = [
      { name: 'Apple', category: smartPhone },
      { name: 'Samsung', category: smartPhone },
      { name: 'Google', category: smartPhone },
      { name: 'Xiaomi', category: smartPhone },
      { name: 'OnePlus', category: smartPhone },
    ];

    const savedBrands = await this.brandRepo.save(brands);
    const [apple, samsung, google, xiaomi, onePlus] = savedBrands;

    // 3. Seed Product Colors

    const productColors = [{ name: 'Red' }, { name: 'Blue' }, { name: 'Black' }, { name: 'White' }];

    const savedColors = await this.productColorRepo.save(productColors);
    const [redColor, blueColor, blackColor, whiteColor] = savedColors;

    // 4. Seed Products

    const productDefs: { data: Partial<Product>; colors: ProductColor[] }[] = [
      {
        data: {
          name: 'iPhone 13',
          brand: apple,
          description: 'The latest iPhone model with advanced features.',
          price: 999.99,
          image_url: 'https://picsum.photos/300/200?random=1',
        },
        colors: [redColor, blueColor],
      },
      {
        data: {
          name: 'Galaxy S21',
          brand: samsung,
          description: 'A powerful Android smartphone from Samsung.',
          price: 899.99,
          image_url: 'https://picsum.photos/300/200?random=2',
        },
        colors: [blackColor, whiteColor],
      },
      {
        data: {
          name: 'iPhone 14',
          brand: apple,
          description: 'A premium smartphone with improved camera performance and battery life.',
          price: 1099.99,
          image_url: 'https://picsum.photos/300/200?random=3',
        },
        colors: [blackColor, whiteColor],
      },
      {
        data: {
          name: 'iPhone 15 Pro',
          brand: apple,
          description: 'A flagship smartphone featuring a titanium design and powerful processor.',
          price: 1299.99,
          image_url: 'https://picsum.photos/300/200?random=4',
        },
        colors: [blueColor, blackColor],
      },
      {
        data: {
          name: 'Galaxy S22',
          brand: samsung,
          description: 'A next-generation Galaxy smartphone with a vibrant AMOLED display.',
          price: 999.99,
          image_url: 'https://picsum.photos/300/200?random=5',
        },
        colors: [whiteColor, blackColor],
      },
      {
        data: {
          name: 'Galaxy Z Flip 5',
          brand: samsung,
          description: 'A foldable smartphone combining style with cutting-edge technology.',
          price: 1199.99,
          image_url: 'https://picsum.photos/300/200?random=6',
        },
        colors: [blueColor, whiteColor],
      },
      {
        data: {
          name: 'Pixel 7',
          brand: google,
          description: 'Google smartphone with an exceptional camera and clean Android experience.',
          price: 799.99,
          image_url: 'https://picsum.photos/300/200?random=7',
        },
        colors: [whiteColor, blackColor],
      },
      {
        data: {
          name: 'Pixel 8 Pro',
          brand: google,
          description: 'A premium Google phone powered by AI-enhanced features.',
          price: 1099.99,
          image_url: 'https://picsum.photos/300/200?random=8',
        },
        colors: [blueColor, blackColor],
      },
      {
        data: {
          name: 'Xiaomi 13',
          brand: xiaomi,
          description: 'A flagship smartphone offering excellent value and performance.',
          price: 749.99,
          image_url: 'https://picsum.photos/300/200?random=9',
        },
        colors: [blackColor, redColor],
      },
      {
        data: {
          name: 'Redmi Note 13 Pro',
          brand: xiaomi,
          description: 'A feature-packed mid-range smartphone with a high-resolution camera.',
          price: 429.99,
          image_url: 'https://picsum.photos/300/200?random=10',
        },
        colors: [blueColor, whiteColor],
      },
      {
        data: {
          name: 'OnePlus 11',
          brand: onePlus,
          description: 'A high-performance smartphone with ultra-fast charging capabilities.',
          price: 849.99,
          image_url: 'https://picsum.photos/300/200?random=11',
        },
        colors: [blackColor],
      },
      {
        data: {
          name: 'OnePlus Nord 3',
          brand: onePlus,
          description: 'A stylish mid-range smartphone delivering smooth everyday performance.',
          price: 499.99,
          image_url: 'https://picsum.photos/300/200?random=12',
        },
        colors: [blueColor],
      },
    ];

    const savedProducts = await this.productRepo.save(productDefs.map((p) => p.data));

    // 5. Seed Product Color Variants

    const variants: Partial<ProductColorVariant>[] = savedProducts.flatMap((product, i) =>
      productDefs[i].colors.map((color) => ({ product, product_color: color })),
    );

    await this.productColorVariantRepo.save(variants);

    console.log('✅ Seeding completed successfully!');
  }
}
