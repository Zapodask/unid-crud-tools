import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  // Buscar todas as ferramentas
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.toolsService.findAll();
  }

  // Criar ferramenta
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body) {
    const { title, link, description, tags } = body;

    const tool = this.toolsService.create({
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
    return { message: this.toolsService.delete(id) };
  }
}
