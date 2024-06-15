import { Base } from 'src/bases/entities/base.entity';
import { BookedProduct } from 'src/booked-product/entities/booked-product.entity';
import { BookedTour } from 'src/booked-tour/entities/booked-tour.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Product } from 'src/product/entities/product.entity';
import { Review } from 'src/review/entities/review.entity';
import { Tour } from 'src/tour/entities/tour.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ default: "user" })
  role: string;

  @Column({ default: false })
  isBanned: boolean;

  // Отношение, связи между таблицами

  @OneToMany(() => Product, (product) => product.user, { cascade: true, onDelete: 'CASCADE' })
  productes: Product[]

  @OneToMany(() => Tour, (tour) => tour.user, { cascade: true, onDelete: 'CASCADE' })
  toures: Tour[]

  @OneToMany(() => Base, (base) => base.user, { cascade: true, onDelete: 'CASCADE' })
  bases: Base[]

  @OneToMany(() => Review, (review) => review.user, { cascade: true, onDelete: 'CASCADE' })
  review: Review[]

  @OneToMany(() => BookedProduct, (booked) => booked.user, { cascade: true, onDelete: 'CASCADE' }) 
  bookedProduct: BookedProduct[]

  // booked-tour
  @OneToMany(() => BookedTour, (bookedTour) => bookedTour.user, { cascade: true, onDelete: 'CASCADE' })
  bookedTour: BookedTour[]

  // payment
  @OneToMany(() => Payment, (payment) => payment.user, { cascade: true, onDelete: 'CASCADE' })
  payments: Payment[];
}
