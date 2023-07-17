import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import {UserService} from "../user/user.service";
import {JwtStrategy} from "../auth/strategies/jwt.strategy";
import {User} from "../user/user.entity";
import {UserModule} from "../user/user.module";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";

@Module({
	imports: [TypeOrmModule.forFeature([Post, User])],
	providers: [PostService, UserService],
	controllers: [PostController],
	exports: [PostService],
})
export class PostModule {}
