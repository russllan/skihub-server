import { Base } from "src/bases/entities/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number

    @Column({ default: 0 })
    rating: number

    @Column()
    comment: string

    // relation
    @ManyToOne(() => Base, (base) => base.reviews, {onDelete: "CASCADE"})
    @JoinColumn({name: "base_id"})
    bases: Base

    @ManyToOne(() => User, (user) => user.review, {onDelete: 'CASCADE'})
    @JoinColumn({name: "user_id"})
    user: User
}
