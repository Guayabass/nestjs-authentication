import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUserMiddleware)
      // .exclude({//para excluir ciertos path, si hay que usar /api/
      //   path: 'api/users/search/:id',
      //   method: RequestMethod.GET,
      // })
      .forRoutes(
        //CustomersController para todo
        {
          path: '/users/:id',
          method: RequestMethod.GET,
        } /** ,
    {
      path: '/users/search/:id',
      method: RequestMethod.GET
    }*/,
      );
  }
}
