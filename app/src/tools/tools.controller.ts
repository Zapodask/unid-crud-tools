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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Tool } from 'src/db/models/tool.entity';
import { BadRequestSwagger } from 'src/swagger/errors.swagger';
import {
  CreateSwagger,
  FindAllSwagger,
  FindOneSwagger,
} from 'src/swagger/tools.swagger';
import { CreateDto } from './dto/create.dto';
import { FindAllQueryDto } from './dto/findAllQuery.dto';
import { ResponsePaginate } from './dto/responsePaginated.dto';
import { ToolsService } from './tools.service';

@Controller('tools')
@ApiTags('Tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  // Buscar todas as ferramentas
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar ferramentas' })
  @ApiResponse({
    status: 200,
    description: 'Ferramentas listadas',
    type: FindAllSwagger,
    isArray: true,
  })
  findAll(
    @Query('tag') tag: FindAllQueryDto['tag'],
    @Query('page') page: FindAllQueryDto['page'],
    @Query('perPage') perPage: FindAllQueryDto['perPage'],
    @Query() query: FindAllQueryDto, // Swagger bug
  ): Promise<ResponsePaginate> {
    return this.toolsService.findAll(tag, page, perPage);
  }

  // Criar ferramenta
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar ferramenta' })
  @ApiResponse({
    status: 201,
    description: 'Ferramenta criada',
    type: CreateSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Ferramenta já cadastrada',
    type: BadRequestSwagger,
  })
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
  @ApiOperation({ summary: 'Buscar uma ferramenta' })
  @ApiResponse({
    status: 200,
    description: 'Ferramenta encontrada',
    type: FindOneSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Ferramenta não encontrada',
    type: BadRequestSwagger,
  })
  findOne(@Param('id') id: number) {
    return this.toolsService.findOne(id);
  }

  // Deletar ferramenta
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deletar uma ferramenta' })
  @ApiResponse({ status: 200, description: 'Ferramenta deletada' })
  @ApiResponse({
    status: 404,
    description: 'Ferramenta não encontrada',
    type: BadRequestSwagger,
  })
  delete(@Param('id') id: number) {
    return this.toolsService.delete(id);
  }
}
