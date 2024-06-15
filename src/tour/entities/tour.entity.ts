import { Base } from 'src/bases/entities/base.entity';
import { BookedTour } from 'src/booked-tour/entities/booked-tour.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tour')
export class Tour {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column({nullable: true})
  image: string;

  @Column()
  cost: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  text: string;

  @Column({ default: 1 })
  amountDay: number;

  @Column({ default: 1 })
  amount: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ default: false })
  isBooked: boolean;

  // Отношение, связи
  @ManyToOne(() => User, (user) => user.toures, {onDelete: "CASCADE"})
  @JoinColumn({name: "user_id"})
  user: User

  @ManyToOne(() => Base, (base) => base.toures, {onDelete: "CASCADE"})
  @JoinColumn({name: "base_id"})
  base: Base

  // booked-tour
  @OneToMany(() => BookedTour, (bookedTour) => bookedTour.tour)
  bookedTour: BookedTour[]
}
