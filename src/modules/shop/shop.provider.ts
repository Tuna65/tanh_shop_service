import { Shop } from 'src/entities/shop.entity';
import { DataSource } from 'typeorm';

export const ShopProviders = [
  {
    provide: 'SHOP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Shop),
    inject: ['DATA_SOURCE'],
  },
];
