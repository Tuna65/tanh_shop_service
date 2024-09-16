import { Expose } from 'class-transformer';
import { BaseDTO } from 'src/base/dto.base';

export class ShopDTO extends BaseDTO {
  @Expose()
  name: string;

  @Expose()
  package: string;

  @Expose()
  alias: string;
}
