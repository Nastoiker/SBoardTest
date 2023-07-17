import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}
	async findall(): Promise<User[]> {
		return await this.usersRepository.find();
	}

	// get one user
	async findOne(id: number): Promise<User> {
		return await this.usersRepository
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.posts', 'posts')
			.where('user.id = :id', { id })
			.getOne();;
	}
	async checkExist(email: string): Promise<User> {
		return await this.usersRepository.findOne({ where: { email } });
	}

	async update(id: number, user: User): Promise<User> {
		await this.usersRepository.update(id, user);
		return await this.usersRepository.findOne({ where: { id } });
	}
	async delete(id: number): Promise<void> {
		await this.usersRepository.delete(id);
	}
}
