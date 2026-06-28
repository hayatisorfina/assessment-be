import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { ProductColorVariant } from './entities/product-color-variant.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductColorVariant)
    private productColorVariantRepository: Repository<ProductColorVariant>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(query: any) {
    const { page, limit, product_name, category, brand, color } = query;

    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const queryBuilder = this.productColorVariantRepository
      .createQueryBuilder('variant')
      .leftJoinAndSelect('variant.product', 'product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('brand.category', 'category')
      .leftJoinAndSelect('variant.product_color', 'product_color');

    if (product_name) {
      queryBuilder.andWhere('product.name ILIKE :product_name', { product_name: `%${product_name}%` });
    }

    if (brand) {
      queryBuilder.andWhere('brand.id = :brandId', { brandId: brand });
    }

    if (category) {
      queryBuilder.andWhere('brand.category = :categoryId', { categoryId: category });
    }

    if (color) {
      queryBuilder.andWhere('product_color.id = :colorId', { colorId: color });
    }

    queryBuilder.skip(skip).take(pageSize);

    const [variants, total] = await queryBuilder.getManyAndCount();

    const formattedData = variants.map((v) => ({
      variant_id: v.id,
      product_id: v.product?.id,
      name: `${v.product?.name} (${v.product_color?.name})`,
      price: v.product?.price,
      image_url: v.product?.image_url,
      color_id: v.product_color?.id,
      color_name: v.product_color?.name,
      brand_name: v.product?.brand?.name,
      category_name: v.product?.brand?.category?.name,
    }));

    return {
      data: formattedData,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
