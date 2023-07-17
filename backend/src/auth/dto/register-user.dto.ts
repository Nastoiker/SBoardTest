import {
	IsBoolean,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
export class CreateUserDto {
	@IsEmail()
	email: string;

	@IsString({ message: 'Имя должен быть строкой' })
	firstName: string;
	@IsString({ message: 'Фамиллия должен быть строкой' })
	lastName: string;
	@IsString({ message: 'Пароль должен быть строкой!' })
	password: string;
}
