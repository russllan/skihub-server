import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, id: number) {
    const isExist = await this.productRepository.findOne({
      where: {
        user: { id: id },
        base: createProductDto.base,
        title: createProductDto.title,
      },
    });

    if (isExist) throw new BadRequestException('This product already exist!');

    let newProduct;
    if (createProductDto.type == 'Одежда') {
      newProduct = {
        title: createProductDto.title,
        image: createProductDto.image,
        amount: createProductDto.amount,
        cost: createProductDto.cost,
        type: createProductDto.type,
        size: createProductDto.size,
        color: createProductDto.color,
        gender: createProductDto.gender,
        text: createProductDto.text,
        startDate: createProductDto.startDate,
        endDate: createProductDto.endDate,
        user: { id: id },
        base: createProductDto.base,
      };
    } else if (createProductDto.type == 'Снаряжение') {
      newProduct = {
        title: createProductDto.title,
        image: createProductDto.image,
        amount: createProductDto.amount,
        cost: createProductDto.cost,
        type: createProductDto.type,
        size: createProductDto.size,
        height: createProductDto.height,
        weigth: createProductDto.weight,
        color: createProductDto.color,
        gender: createProductDto.gender,
        text: createProductDto.text,
        startDate: createProductDto.startDate,
        endDate: createProductDto.endDate,
        status: createProductDto.status,
        user: { id: id },
        base: createProductDto.base,
      };
    }
    if (!newProduct)
      throw new BadRequestException('Не заполнены поля Продукта!');
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    const product = await this.productRepository.find({
      relations: { base: true },
    });
    if (!product) throw new NotFoundException('Not found products');
    return product;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!product) throw new NotFoundException('Not found product!');
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!product) throw new NotFoundException(`Not found this ${id} product`);
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id: id } });

    if (!product) throw new NotFoundException(`Not found product`);
    return await this.productRepository.delete(id);
  }
}
