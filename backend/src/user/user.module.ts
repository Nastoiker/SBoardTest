import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PostService } from '../post/post.service';
import {Post} from "../post/post.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User, Post])],
	providers: [UserService, PostService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
