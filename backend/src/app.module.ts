import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserEntity } from './user/user.model';
import { PhotoModule } from './photo/photo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
		TypeOrmModule.forRoot({
			type: process.env.DB_TYPE as any,
			host: process.env.PG_HOST,
			port: parseInt(process.env.PG_PORT),
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		UserModule,
		PhotoModule,
	],
	controllers: [AppController, UserController],
	providers: [AppService],
})
export class AppModule {}
