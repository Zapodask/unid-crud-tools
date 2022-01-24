import { ApiProperty } from '@nestjs/swagger';

import { Tool } from 'src/db/models/tool.entity';

export class ResponsePaginate {
  @ApiProperty()
  readonly data: Tool[];

  @ApiProperty()
  readonly pagination: object;
}
