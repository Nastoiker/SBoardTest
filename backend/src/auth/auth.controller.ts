import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Query,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REGISTER_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from './dto/register-user.dto';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('register')
	async register(@Body() dto: CreateUserDto): Promise<User> {
		const oldUser = await this.authService.findUser(dto.email);
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTER_ERROR);
		}
		return this.authService.createUser(dto);
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { email, password }: AuthDto) {
		const user = await this.authService.validateUser(email, password);
		return this.authService.login(user.email);
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get('authByJwt')
	@UseGuards(JwtAuthGuard)
	async authByJwt(@Req() query) {
		console.log(query.user);
		const user = await this.authService.authByJwt(query.user.email);
		return user;
	}
}
