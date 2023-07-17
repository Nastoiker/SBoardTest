import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	setupSwagger(app);
	app.enableCors({
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		origin: process.env.FRONTEND_URL,
		credentials: true,
	});
	await app.listen(3000);
}
bootstrap();
