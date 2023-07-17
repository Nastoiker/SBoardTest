import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	CreateDateColumn,
	ManyToOne,
	UpdateDateColumn,
	Unique,
} from 'typeorm';
import { User } from '../user/user.entity';
@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id: number;
	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;
	@Column()
	title: string;

	@Column()
	content: string;

	@ManyToOne(() => User, (user) => user.posts)
	user: User;
}
