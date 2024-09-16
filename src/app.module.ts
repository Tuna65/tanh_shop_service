import { Module, Scope } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HandlerExceptionsFilter } from './common/filter/exception.filter';
import { ShopModule } from './modules/shop/shop.module';

@Module({
  imports: [ShopModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      scope: Scope.REQUEST,
      useClass: HandlerExceptionsFilter,
    },
  ],
})
export class AppModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes(UserController);
//   }
// }
