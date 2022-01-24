import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Tool } from 'src/db/models/tool.entity';

class Pagination {
  @ApiProperty()
  page: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  total: number;
}

export class FindAllSwagger {
  @ApiProperty({
    type: OmitType(Tool, ['createdAt', 'updatedAt']),
    isArray: true,
  })
  data: Tool[];

  @ApiProperty({ type: Pagination })
  pagination: Pagination;
}

export class CreateSwagger extends OmitType(Tool, ['createdAt', 'updatedAt']) {}

export class FindOneSwagger extends OmitType(Tool, [
  'createdAt',
  'updatedAt',
]) {}
