import { BookedProduct } from 'src/booked-product/entities/booked-product.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stripePaymentIntentId: string;

  @Column({nullable: true, type: 'float'})
  price: number;

  @Column()
  currency: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToOne(() => Product, (product) => product.payments)
  product: Product;

  @ManyToOne(() => BookedProduct, (bookedProduct) => bookedProduct.payments, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  bookedProduct: BookedProduct;
}
