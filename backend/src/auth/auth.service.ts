import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, USER_WAS_BANNED, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

import * as fs from 'fs';
import { type } from 'os';
@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}
	async createUser(dto: any) {
		const salt = await genSalt(10);
		const password = dto.hashpassword;
		dto.hashpassword = await hash(password, salt);
		console.log(dto.hashpassword);
		const user = { ...dto, hashpassword: dto.hashpassword };
		try {
			return null;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
	async findUser(email: string): Promise<null> {
		return null;
	}
	async validateUser(email: string, password: string): Promise<null> {
		const User = await this.findUser(email);
		if (!User) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectUser = await compare(password, '');
		if (User === false) {
			throw new UnauthorizedException(USER_WAS_BANNED);
		}
		if (!isCorrectUser) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return;
	}
	async authByJwt(id: string) {
		return null;
	}
	async login(email: string) {
		const payLoad = { email, role: 'user' };
		return {
			accesToken: await this.jwtService.signAsync(payLoad),
		};
	}
}
