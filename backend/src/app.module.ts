import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { PhotoModule } from './photo/photo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from "./auth/auth.module";
import { PostModule } from './post/post.module';

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
			autoLoadEntities: true,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		UserModule,
		PhotoModule,
		AuthModule,
		PostModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
