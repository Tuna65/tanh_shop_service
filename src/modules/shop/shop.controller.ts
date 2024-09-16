import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ShopDTO } from 'src/dto/shop.dto';
import { EMessagePattern } from 'src/enums/EMessagePartern';
import { ShopService } from './shop.service';
import { QueryShop } from 'src/types/shop.type';

@Controller()
export class ShopController {
  constructor(private shopService: ShopService) {}

  @MessagePattern(EMessagePattern.CREATE_SHOP)
  create(dto: ShopDTO) {
    return this.shopService.create(dto);
  }

  @MessagePattern(EMessagePattern.EDIT_SHOP)
  edit(payload: { id: string; dto: ShopDTO }) {
    const { id, dto } = payload;
    return this.shopService.edit(id, dto);
  }

  @MessagePattern(EMessagePattern.DETAIL_SHOP)
  detail(id: string) {
    return this.shopService.detail(id);
  }

  // @MessagePattern(EMessagePattern.DELETE_SHOP)
  // delete(id: string) {
  //   return this.shopService.delete(id);
  // }

  @MessagePattern(EMessagePattern.LIST_SHOP)
  find(query: QueryShop) {
    return this.shopService.find(query);
  }
}
