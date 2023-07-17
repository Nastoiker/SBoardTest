import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeleteResult, FindOneOptions, Repository} from 'typeorm';
import { Post as PostUser} from './post.entity';

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostUser)
		private postRepository: Repository<PostUser>,
	) {}
	async findall(): Promise<PostUser[]> {
		return await this.postRepository.find();
	}
	async findOne(id: number): Promise<PostUser | null> {
		const options: FindOneOptions<PostUser> = {
			where: { id },
			relations: ['user'],
		};
		return this.postRepository.findOne(options);
	}
	async findPostsByUser(id: number): Promise<PostUser[]> {
		return await this.postRepository
			.createQueryBuilder('post')
			.leftJoinAndSelect('post.user', 'user')
			.where('user.id = :id', { id })
			.getMany();
	}
	async findOneByIdAndUser(id: number, userId: number): Promise<PostUser | null> {
		const post = await this.findOne(id);
		if (!post || !post.user || post.user.id !== userId) {
			return null;
		}
		return post;
	}
	async create(user: PostUser): Promise<PostUser> {
		const newUser = this.postRepository.create(user);
		return await this.postRepository.save(newUser);
	}

	async update(id: number, user: PostUser): Promise<PostUser> {
		await this.postRepository.update(id, user);
		return await this.postRepository.findOne({ where: { id } });
	}

	async delete(id: number): Promise<DeleteResult | null> {
		const deletedPost = await this.postRepository.delete(id);
		if (!deletedPost) {
			return null;
		}
		return deletedPost;
	}
}
