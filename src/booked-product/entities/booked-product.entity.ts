import { Payment } from 'src/payment/entities/payment.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bookedProduct')
export class BookedProduct {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // product: number;

  // @Column()
  // amount:number;

  @Column({ default: true })
  isPickUp: boolean;

  @Column({ default: false })
  isRefund: boolean;

  @Column()
  endDate: string;

  @Column({ default: 1 })
  amount: number;

  // relation

  @ManyToOne(() => Product, (product) => product.bookedProduct, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.bookedProduct, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // payment
  @OneToMany(() => Payment, (payment) => payment.bookedProduct, {onDelete: 'CASCADE'})
  payments: Payment[];
}
