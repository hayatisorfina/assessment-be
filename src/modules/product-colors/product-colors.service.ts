import { Injectable } from '@nestjs/common';
import { CreateProductColorDto } from './dto/create-product-color.dto';
import { UpdateProductColorDto } from './dto/update-product-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductColor } from './entities/product-color.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()
export class ProductColorsService {
  constructor(
    @InjectRepository(ProductColor)
    private productColorsRepository: Repository<ProductColor>
  ) {}

  create(createProductColorDto: CreateProductColorDto) {
    return 'This action adds a new productColor';
  }

  async findAll() {
    const productColors = await this.productColorsRepository.find();
    return productColors;
  }

  findOne(id: number) {
    return `This action returns a #${id} productColor`;
  }

  update(id: number, updateProductColorDto: UpdateProductColorDto) {
    return `This action updates a #${id} productColor`;
  }

  remove(id: number) {
    return `This action removes a #${id} productColor`;
  }
}
