import { Inject, Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { mapToDto, mapToEntity } from 'src/configs/dto.config';
import { msgResponse, notFoundException } from 'src/configs/exception.config';
import { ShopDTO } from 'src/dto/shop.dto';
import { Shop } from 'src/entities/shop.entity';
import { QueryShop } from 'src/types/shop.type';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable({})
export class ShopService {
  constructor(
    @Inject('SHOP_REPOSITORY')
    private shopRepository: Repository<Shop>,
  ) {}

  mapToEntity(entity: Shop, dto: ShopDTO) {
    delete dto.id;
    delete dto.alias;
    return mapToEntity(entity, dto);
  }

  async create(dto: ShopDTO) {
    const { alias } = dto;
    const exitedAlias = await this.shopRepository.findOneBy({ alias });
    if (exitedAlias) return notFoundException('Shop alias đã tồn tại');
    dto.id = uuidv4().toString();
    return mapToDto(ShopDTO, await this.shopRepository.save(dto));
  }

  async edit(id: string, dto: ShopDTO) {
    const entity = await this.shopRepository.findOne({ where: { id } });
    if (!entity) return notFoundException('Shop không tồn tại hoặc đã bị xóa!');

    const newEntity = mapToEntity(entity, dto);
    return mapToDto(ShopDTO, await this.shopRepository.save(newEntity));
  }

  async detail(id: string) {
    const entity = await this.shopRepository.findOneBy({ id });
    if (!entity) return notFoundException('Shop không tồn tại hoặc đã bị xóa!');
    return mapToDto(ShopDTO, entity);
  }

  async delete(id: string) {
    const entity = await this.shopRepository.findOneBy({ id });
    if (!entity) return notFoundException('Shop không tồn tại hoặc đã bị xóa!');
    await this.shopRepository.softDelete({ id });
    return msgResponse('Xóa Shop thành công');
  }

  async find(query: QueryShop) {
    const { name } = query;
    const queryBuilder: SelectQueryBuilder<Shop> =
      this.shopRepository.createQueryBuilder('shop');
    queryBuilder.andWhere('lower(unaccent(shop.name)) LIKE :name', {
      name: name ? `%${name.toLowerCase()}%` : `%`,
    });
    queryBuilder.orderBy('shop.createdAt', 'DESC');
    queryBuilder.getMany();

    const data = await paginate<Shop>(queryBuilder, query);
    return {
      meta: data.meta,
      items: data.items.map((i) => mapToDto(ShopDTO, i)),
    };
  }
}
