import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookedProductDto } from './dto/create-booked-product.dto';
import { UpdateBookedProductDto } from './dto/update-booked-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookedProduct } from './entities/booked-product.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class BookedProductService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(BookedProduct)
    private readonly bookedProductRepository: Repository<BookedProduct>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
    );
  }

  async create(createBookedProductDto: CreateBookedProductDto, id: number) {
    const product = await this.productRepository.findBy({
      // user: { id: id },
      id: +createBookedProductDto.product,
    });

    if (!product.length) throw new NotFoundException('Product not found!');

    const existingBooking = await this.bookedProductRepository.findOne({
      where: { product: { id: +createBookedProductDto.product } },
      relations: { payments: true },
    });

    if (existingBooking)
      throw new BadRequestException('This booked product already exists!');

    product[0].amount -= createBookedProductDto.amount;
    await this.productRepository.save(product);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: product[0].cost * createBookedProductDto.amount,
      currency: 'usd',
    });

    let newBookedProduct = {
      isRefund: createBookedProductDto.isRefund,
      startDate: createBookedProductDto.startDate,
      endDate: createBookedProductDto.endDate,
      product: createBookedProductDto.product,
      user: { id },
    };

    if (!newBookedProduct)
      throw new BadRequestException('Somithing went wrong!');

    const savedBookedProduct =
      await this.bookedProductRepository.save(newBookedProduct);
    const payment = this.paymentRepository.create({
      stripePaymentIntentId: paymentIntent.id,
      price: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      user: { id: id },
      product: { id: product[0].id },
      bookedProduct: savedBookedProduct,
    });

    await this.paymentRepository.save(payment);

    return {
      bookedProduct: savedBookedProduct,
      paymentIntentClientSecret: paymentIntent.client_secret,
    };
  }

  async findAll() {
    const bookedProduct = await this.bookedProductRepository.find({
      relations: { product: true },
    });
    if (!bookedProduct) throw new NotFoundException('Not found booked product');

    return bookedProduct;
  }

  async findOne(id: number) {
    const bookedProduct = await this.bookedProductRepository.findOne({
      where: { id: id },
    });
    if (!bookedProduct) throw new NotFoundException('Not found booked product');
    return bookedProduct;
  }

  async update(
    bookedId: number,
    updateBookedProductDto: UpdateBookedProductDto,
  ) {
    const bookedProduct = await this.bookedProductRepository.findOne({
      where: { id: bookedId },
      relations: { product: true },
    });
    if (!bookedProduct)
      throw new NotFoundException(
        `Not found this #${bookedId} booked product!`,
      );

    const product = await this.productRepository.findOne({
      where: { id: bookedProduct.product.id },
    });
    if (!product)
      throw new NotFoundException(`Not found this #${bookedId} product`);

    if (updateBookedProductDto.isRefund && !bookedProduct.isRefund) {
      product.amount += updateBookedProductDto.amount;
      await this.productRepository.save(product);
    } else if (updateBookedProductDto.isRefund && bookedProduct.isRefund) {
      throw new BadRequestException('This product has already been returned');
    }

    Object.assign(bookedProduct, updateBookedProductDto);
    return await this.bookedProductRepository.update(
      bookedId,
      updateBookedProductDto,
    );
  }

  async remove(id: number) {
    const bookedProduct = await this.bookedProductRepository.findOne({
      where: { id: id },
    });

    if (!bookedProduct)
      throw new NotFoundException('Not found booked product!');
    return await this.bookedProductRepository.delete(id);
  }

  async findForAdmin(id: number) {
    const bookedProduct = await this.bookedProductRepository.find({
      where: { user: { id: id } },
      relations: { product: true },
    });
    if (!bookedProduct)
      throw new NotFoundException('Такого забр. продукта нет!');
    return bookedProduct;
  }
}
