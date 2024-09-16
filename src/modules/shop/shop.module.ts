import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpServices } from 'src/common/http/config.http';
import { DatabaseModule } from 'src/database/database.module';
import { ShopController } from './shop.controller';
import { ShopProviders } from './shop.provider';
import { ShopService } from './shop.service';

@Module({
  imports: [
    DatabaseModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [ShopController],
  providers: [...ShopProviders, ShopService, HttpServices],
  exports: [ShopService],
})
export class ShopModule {}
