import { Tool } from 'src/db/models/tool.entity';

export class ResponsePaginate {
  readonly data: Tool[];
  readonly pagination: object;
}
