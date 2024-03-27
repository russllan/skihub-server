import { Product } from "src/product/entities/product.entity";
import { Review } from "src/review/entities/review.entity";
import { Tour } from "src/tour/entities/tour.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("bases")
export class Base {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number

    @Column()
    title: string

    @Column({type: "bytea"})
    image: Buffer

    @Column({ type: "bytea" })
    imageSlapes: Buffer

    @Column()
    address: string

    @Column()
    text: string

    // Oтношения
    @ManyToOne(() => User, (user) => user.toures, {onDelete: "CASCADE"})
    @JoinColumn({name: "user_id"})
    user: User

    @OneToMany(() => Review, (review) => review.bases)
    reviews: Review[]

    @OneToMany(() => Product, (product) => product.base)
    productes: Product[]

    @OneToMany(() => Tour, (tour) => tour.base)
    toures: Tour[]
}
