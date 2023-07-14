import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.model';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { UserEntity } from '../user/user.model';

@Module({
	imports: [TypeOrmModule.forFeature([Photo, UserEntity])],
	providers: [PhotoService],
	controllers: [PhotoController],
})
export class PhotoModule {}
