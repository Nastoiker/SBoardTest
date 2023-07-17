import {forwardRef, Module} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '../configs/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/user.entity";
import {UserModule} from "../user/user.module";
import {PostModule} from "../post/post.module";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {Post} from "../post/post.entity";

@Module({
	controllers: [AuthController],
	imports: [
		forwardRef(() => UserModule),
		TypeOrmModule.forFeature([User, Post]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
		PassportModule,
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
