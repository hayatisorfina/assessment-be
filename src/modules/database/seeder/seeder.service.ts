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

    const categories = [
      { name: 'Smartphones' },
      { name: 'Tablets' },
      { name: 'Laptops' },
      { name: 'Smartwatches' },
    ];

    const savedCategories = await this.categoryRepo.save(categories);
    const [smartPhone, tablet, laptop, smartwatch] = savedCategories;

    // 2. Seed Brands

    const brands = [
      // Smartphones
      { name: 'Apple', category: smartPhone },
      { name: 'Samsung', category: smartPhone },
      { name: 'Google', category: smartPhone },
      { name: 'Xiaomi', category: smartPhone },
      { name: 'OnePlus', category: smartPhone },
      // Tablets
      { name: 'Lenovo', category: tablet },
      { name: 'Microsoft', category: tablet },
      { name: 'Amazon', category: tablet },
      // Laptops
      { name: 'Dell', category: laptop },
      { name: 'HP', category: laptop },
      { name: 'Asus', category: laptop },
      // Smartwatches
      { name: 'Garmin', category: smartwatch },
      { name: 'Fitbit', category: smartwatch },
    ];

    const savedBrands = await this.brandRepo.save(brands);
    const [apple, samsung, google, xiaomi, onePlus, lenovo, microsoft, amazon, dell, hp, asus, garmin, fitbit] = savedBrands;

    // 3. Seed Product Colors

    const productColors = [
      { name: 'Red' },
      { name: 'Blue' },
      { name: 'Black' },
      { name: 'White' },
      { name: 'Silver' },
      { name: 'Green' },
      { name: 'Gold' },
      { name: 'Purple' },
    ];

    const savedColors = await this.productColorRepo.save(productColors);
    const [redColor, blueColor, blackColor, whiteColor, silverColor, greenColor, goldColor, purpleColor] = savedColors;

    // 4. Seed Products

    const productDefs: { data: Partial<Product>; colors: ProductColor[] }[] = [
      // Smartphones — Apple
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
          name: 'iPhone 14',
          brand: apple,
          description: 'A premium smartphone with improved camera performance and battery life.',
          price: 1099.99,
          image_url: 'https://picsum.photos/300/200?random=3',
        },
        colors: [blackColor, whiteColor, purpleColor],
      },
      {
        data: {
          name: 'iPhone 15 Pro',
          brand: apple,
          description: 'A flagship smartphone featuring a titanium design and powerful processor.',
          price: 1299.99,
          image_url: 'https://picsum.photos/300/200?random=4',
        },
        colors: [blackColor, whiteColor, goldColor],
      },
      // Smartphones — Samsung
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
          name: 'Galaxy S22',
          brand: samsung,
          description: 'A next-generation Galaxy smartphone with a vibrant AMOLED display.',
          price: 999.99,
          image_url: 'https://picsum.photos/300/200?random=5',
        },
        colors: [whiteColor, greenColor],
      },
      {
        data: {
          name: 'Galaxy Z Flip 5',
          brand: samsung,
          description: 'A foldable smartphone combining style with cutting-edge technology.',
          price: 1199.99,
          image_url: 'https://picsum.photos/300/200?random=6',
        },
        colors: [blueColor, purpleColor],
      },
      // Smartphones — Google
      {
        data: {
          name: 'Pixel 7',
          brand: google,
          description: 'Google smartphone with an exceptional camera and clean Android experience.',
          price: 799.99,
          image_url: 'https://picsum.photos/300/200?random=7',
        },
        colors: [whiteColor, blackColor, greenColor],
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
      // Smartphones — Xiaomi
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
      // Smartphones — OnePlus
      {
        data: {
          name: 'OnePlus 11',
          brand: onePlus,
          description: 'A high-performance smartphone with ultra-fast charging capabilities.',
          price: 849.99,
          image_url: 'https://picsum.photos/300/200?random=11',
        },
        colors: [blackColor, greenColor],
      },
      {
        data: {
          name: 'OnePlus Nord 3',
          brand: onePlus,
          description: 'A stylish mid-range smartphone delivering smooth everyday performance.',
          price: 499.99,
          image_url: 'https://picsum.photos/300/200?random=12',
        },
        colors: [blueColor, silverColor],
      },
      // Tablets — Lenovo
      {
        data: {
          name: 'Lenovo Tab P12 Pro',
          brand: lenovo,
          description: 'A premium Android tablet with a stunning AMOLED display and stylus support.',
          price: 699.99,
          image_url: 'https://picsum.photos/300/200?random=13',
        },
        colors: [blackColor, silverColor],
      },
      {
        data: {
          name: 'Lenovo Tab M10 Plus',
          brand: lenovo,
          description: 'A versatile everyday tablet with long battery life and vivid display.',
          price: 299.99,
          image_url: 'https://picsum.photos/300/200?random=14',
        },
        colors: [silverColor, blueColor],
      },
      // Tablets — Microsoft
      {
        data: {
          name: 'Surface Pro 9',
          brand: microsoft,
          description: 'A powerful 2-in-1 tablet and laptop with Intel Core processors.',
          price: 1299.99,
          image_url: 'https://picsum.photos/300/200?random=15',
        },
        colors: [silverColor, blackColor],
      },
      {
        data: {
          name: 'Surface Go 3',
          brand: microsoft,
          description: 'A compact and affordable tablet designed for everyday productivity.',
          price: 599.99,
          image_url: 'https://picsum.photos/300/200?random=16',
        },
        colors: [silverColor],
      },
      // Tablets — Amazon
      {
        data: {
          name: 'Fire HD 10',
          brand: amazon,
          description: 'An affordable 10-inch tablet with Alexa built-in and long battery life.',
          price: 149.99,
          image_url: 'https://picsum.photos/300/200?random=17',
        },
        colors: [blackColor, blueColor],
      },
      {
        data: {
          name: 'Fire Max 11',
          brand: amazon,
          description: 'The most powerful Fire tablet yet with a crisp display and productivity features.',
          price: 229.99,
          image_url: 'https://picsum.photos/300/200?random=18',
        },
        colors: [blackColor],
      },
      // Laptops — Dell
      {
        data: {
          name: 'Dell XPS 13',
          brand: dell,
          description: 'A compact ultrabook with a stunning InfinityEdge display and premium build quality.',
          price: 1249.99,
          image_url: 'https://picsum.photos/300/200?random=19',
        },
        colors: [silverColor, blackColor],
      },
      {
        data: {
          name: 'Dell Inspiron 15',
          brand: dell,
          description: 'A reliable everyday laptop balancing performance and affordability.',
          price: 649.99,
          image_url: 'https://picsum.photos/300/200?random=20',
        },
        colors: [silverColor, blueColor],
      },
      // Laptops — HP
      {
        data: {
          name: 'HP Spectre x360',
          brand: hp,
          description: 'A premium convertible laptop with OLED display and sleek gem-cut design.',
          price: 1499.99,
          image_url: 'https://picsum.photos/300/200?random=21',
        },
        colors: [silverColor, blackColor, goldColor],
      },
      {
        data: {
          name: 'HP Pavilion 14',
          brand: hp,
          description: 'A lightweight and stylish laptop ideal for students and everyday use.',
          price: 549.99,
          image_url: 'https://picsum.photos/300/200?random=22',
        },
        colors: [silverColor, purpleColor],
      },
      // Laptops — Asus
      {
        data: {
          name: 'Asus ZenBook 14',
          brand: asus,
          description: 'An ultra-thin laptop with OLED display and all-day battery life.',
          price: 1099.99,
          image_url: 'https://picsum.photos/300/200?random=23',
        },
        colors: [silverColor, blueColor],
      },
      {
        data: {
          name: 'Asus ROG Zephyrus G14',
          brand: asus,
          description: 'A high-performance gaming laptop with AMD Ryzen and dedicated GPU.',
          price: 1599.99,
          image_url: 'https://picsum.photos/300/200?random=24',
        },
        colors: [whiteColor, blackColor],
      },
      // Smartwatches — Garmin
      {
        data: {
          name: 'Garmin Fenix 7',
          brand: garmin,
          description: 'A rugged multisport GPS smartwatch built for athletes and adventurers.',
          price: 699.99,
          image_url: 'https://picsum.photos/300/200?random=25',
        },
        colors: [blackColor, silverColor],
      },
      {
        data: {
          name: 'Garmin Forerunner 265',
          brand: garmin,
          description: 'A running-focused smartwatch with AMOLED display and advanced training metrics.',
          price: 449.99,
          image_url: 'https://picsum.photos/300/200?random=26',
        },
        colors: [blackColor, whiteColor, blueColor],
      },
      // Smartwatches — Fitbit
      {
        data: {
          name: 'Fitbit Charge 6',
          brand: fitbit,
          description: 'A slim fitness tracker with built-in GPS and Google apps integration.',
          price: 159.99,
          image_url: 'https://picsum.photos/300/200?random=27',
        },
        colors: [blackColor, silverColor, redColor],
      },
      {
        data: {
          name: 'Fitbit Sense 2',
          brand: fitbit,
          description: 'An advanced health smartwatch with stress management and ECG monitoring.',
          price: 279.99,
          image_url: 'https://picsum.photos/300/200?random=28',
        },
        colors: [blackColor, goldColor, blueColor],
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
