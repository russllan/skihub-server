import { Base } from 'src/bases/entities/base.entity';
import { BookedProduct } from 'src/booked-product/entities/booked-product.entity';
import { BookedTour } from 'src/booked-tour/entities/booked-tour.entity';
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

  @OneToMany(() => Product, (product) => product.user)
  productes: Product[]

  @OneToMany(() => Tour, (tour) => tour.user)
  toures: Tour[]

  @OneToMany(() => Base, (base) => base.user)
  bases: Base[]

  @OneToMany(() => Review, (review) => review.user)
  review: Review[]

  @OneToMany(() => BookedProduct, (booked) => booked.user) 
  bookedProduct: BookedProduct[]

  // booked-tour
  @OneToMany(() => BookedTour, (bookedTour) => bookedTour.user)
  bookedTour: BookedTour[]
}
