import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SeederModule } from './modules/database/seeder/seeder.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ProductColorsModule } from './modules/product-colors/product-colors.module';

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
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    BrandsModule,
    ProductColorsModule,
    // SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
