import { Tour } from "src/tour/entities/tour.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('booked-tour')
export class BookedTour {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createDate: Date

    @Column()
    isCancel: boolean

    @Column({default: 1})
    amount: number

    // relation
    @ManyToOne(() => User, (user) => user.bookedTour)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Tour, (tour) => tour.bookedTour)
    @JoinColumn({name: 'tour_id'})
    tour: Tour
}
