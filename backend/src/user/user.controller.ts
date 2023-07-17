import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { NOTFOUNDUSER } from './user.constants';
import { Post as PostUser } from '../post/post.entity';
import { NOTFOUNDPOST } from '../post/post.constants';
import { PostService } from '../post/post.service';
import { IdValidationpipe } from '../pipes/idValidation.pipe';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly postService: PostService,
	) {}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.userService.findall();
	}
	@Get(':id')
	async findPostsByUser(@Param('id', IdValidationpipe) id: number): Promise<PostUser[]> {
		const posts = await this.postService.findPostsByUser(id);
		if (!posts) {
			throw new NotFoundException(NOTFOUNDPOST);
		} else {
			return posts;
		}
	}

	@Put(':id')
	async update(@Param('id', IdValidationpipe) id: number, @Body() user: User): Promise<User> {
		return this.userService.update(id, user);
	}
	@Delete(':id')
	async delete(@Param('id', IdValidationpipe) id: number): Promise<void> {
		const user = await this.userService.findOne(id);
		if (!user) {
			throw new NotFoundException(NOTFOUNDUSER);
		}
		return this.userService.delete(id);
	}
}
