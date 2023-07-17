import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, USER_WAS_BANNED, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

import * as fs from 'fs';
import { type } from 'os';
import {FindOneOptions, Repository} from 'typeorm';
import { User } from '../user/user.entity';
import { CreateUserDto } from './dto/register-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Post as PostUser} from "../post/post.entity";
@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}
	async createUser(dto: CreateUserDto): Promise<User> {
		const salt = await genSalt(10);
		const password = dto.password;
		dto.password = await hash(password, salt);
		const user = { ...dto };
		try {
			const newUser = this.userRepository.create(user);
			return await this.userRepository.save(newUser);
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
	async findUser(email: string): Promise<User | null> {
		const foundUser = await this.userRepository.findOne({ where: { email } });
		if (!foundUser) {
			return null;
		}
		return foundUser;
	}
	async validateUser(email: string, password: string): Promise<User> {
		const User = await this.findUser(email);
		if (!User) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectUser = await compare(password, User.password);
		if (!isCorrectUser) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return User;
	}
	async authByJwt(email: string) {
		const options: FindOneOptions<User> = {
			where: { email },
			relations: ['posts'],
		};
		return this.userRepository.findOne(options);
	}
	async login(email: string) {
		const payLoad = { email };
		return {
			accessToken: await this.jwtService.signAsync(payLoad, {
				secret: 'mysecret',
			}),
		};
	}
}
