import { Expose } from 'class-transformer';
import { EStatus } from 'src/enums/EStatus';

export class BaseDTO {
  @Expose()
  id: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  createdBy: string;

  @Expose()
  updateAt?: Date;

  deletedAt?: Date;
}
