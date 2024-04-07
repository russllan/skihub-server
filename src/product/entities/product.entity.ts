import { Base } from 'src/bases/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @Column()
  title: string;

  // @Column({ type: 'bytea' })
  // image: Buffer;

  @Column()
  image: string;

  @Column()
  amount: number;

  @Column()
  cost: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  text: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ default: 'standart' })
  status: string;

  @Column({ default: false })
  isBooked: boolean;

  @ManyToOne(() => User, (user) => user.productes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Base, (base) => base.productes, {onDelete: "CASCADE"})
  @JoinColumn({name: "base_id"})
  base: Base
}
