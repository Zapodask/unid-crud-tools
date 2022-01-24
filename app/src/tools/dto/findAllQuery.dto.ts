import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllQueryDto {
  @ApiPropertyOptional()
  tag: string;

  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  perPage: number;
}
