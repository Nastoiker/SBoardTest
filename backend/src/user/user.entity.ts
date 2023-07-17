import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn, Unique,
} from 'typeorm';
import { Photo } from '../photo/photo.entity';
import { Post } from '../post/post.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;
	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	@Unique(['email'])
	email: string;

	@Column()
	password: string;
	@OneToMany(() => Post, (post) => post.user)
	posts: Post[];
}
