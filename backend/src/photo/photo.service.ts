import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
	constructor(
		@InjectRepository(Photo)
		private photoRepository: Repository<Photo>,
	) {}

	async findAll(): Promise<Photo[]> {
		return this.photoRepository.find();
	}

	async create(url: string, userId: number): Promise<Photo> {
		const photo = new Photo();
		photo.url = url;
		return this.photoRepository.save(photo);
	}
}
