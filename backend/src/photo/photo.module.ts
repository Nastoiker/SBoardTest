import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { User } from '../user/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Photo, User])],
	providers: [PhotoService],
	controllers: [PhotoController],
})
export class PhotoModule {}
