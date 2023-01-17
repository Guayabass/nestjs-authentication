import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource} from 'typeorm';
import { SessionEntity } from './typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(session({
    name: 'NESTJS_SESSION_ID',
    secret: 'IUJKSHGFSDIUJHGBFUIJDSGHFIJUKDSGHFKJDSHGFKJDSHGKJFDSH',//secret key that no one should have to store the session cookie (id)
    resave: false,
    saveUninitialized: false, //avoids unwanted sessions being created by unlogged users
    cookie: {
      maxAge: 60000,
    },
    store: new TypeormStore()
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
