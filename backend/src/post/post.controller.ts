import {
	Body,
	Controller,
	Delete,
	Get, HttpCode, InternalServerErrorException,
	NotFoundException,
	Param,
	Post,
	Put,
	Req,
	UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { Post as PostUser } from './post.entity';
import { PostService } from './post.service';
import { NOTFOUNDPOST } from './post.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { NOTFOUNDUSER } from '../user/user.constants';
import {IdValidationpipe} from "../pipes/idValidation.pipe";
import {DeleteResult} from "typeorm";

@Controller('post')
export class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly userService: UserService,
	) {}

	@Get()
	async findAll(): Promise<PostUser[]> {
		return await this.postService.findall();
	}

	@Get(':id')
	async findOne(@Param('id', IdValidationpipe) id: number): Promise<PostUser> {
		const posts = await this.postService.findOne(id);
		if (!posts) {
			throw new NotFoundException(NOTFOUNDPOST);
		} else {
			return posts;
		}
	}
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Req() request, @Body() post: PostUser): Promise<PostUser> {
		const userEmail: string = request.user.email;
		const user: User = await this.userService.checkExist(userEmail);
		if (!user) {
			throw new NotFoundException(NOTFOUNDUSER + userEmail);
		}
		post.user = user;
		return await this.postService.create(post);
	}
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Put(':id')
	async update(
		@Param('id', IdValidationpipe) id: number,
		@Req() request,
		@Body() post: PostUser,
	): Promise<PostUser> {
		const email: string = request.user.email;
		const user: User = await this.userService.checkExist(email);
		if (!user) {
			throw new NotFoundException(NOTFOUNDUSER);
		}
		post.user = user;
		const checkAuthor = await this.postService.findOneByIdAndUser(id, user.id);
		if (!checkAuthor) {
			throw new NotFoundException(NOTFOUNDPOST);
		}
		return this.postService.update(id, post);
	}
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@Delete(':id')
	async delete(
		@Req() request,
		@Param('id', IdValidationpipe) id: number,
	): Promise<{ res: DeleteResult; message: string }> {
		const email: string = request.user.email;
		const user: User = await this.userService.checkExist(email);
		const checkAuthor = await this.postService.findOneByIdAndUser(id, user.id);
		if (!checkAuthor) {
			throw new NotFoundException(NOTFOUNDPOST);
		}
		const deleted = await this.postService.delete(id);
		if (!deleted) {
			throw new InternalServerErrorException();
		}
		return { message: 'Пост с id: ' + id + ' был удален', res: deleted };
	}
}
