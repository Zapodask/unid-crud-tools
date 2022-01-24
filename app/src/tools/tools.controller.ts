import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { Tool } from 'src/db/models/tool.entity';
import { CreateDto } from './dto/create.dto';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  // Buscar todas as ferramentas
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query('tag') tag: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.toolsService.findAll(tag, page, perPage);
  }

  // Criar ferramenta
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateDto): Promise<Tool> {
    const { title, link, description, tags } = body;

    const tool = await this.toolsService.create({
      title: title,
      link: link,
      description: description,
      tags: tags,
    });

    return tool;
  }

  // Buscar uma ferramenta
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.toolsService.findOne(id);
  }

  // Deletar ferramenta
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number) {
    return this.toolsService.delete(id);
  }
}
