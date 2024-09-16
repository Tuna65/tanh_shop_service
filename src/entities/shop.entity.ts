import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Shop extends BaseEntity {
  @Column()
  name: string;

  @Column()
  package: string;

  @Column()
  alias: string;

  @Column()
  image: string;

  @Column()
  address: string;

  @Column()
  cityId: string;

  @Column()
  districtId: string;

  @Column()
  wardId: string;
}
