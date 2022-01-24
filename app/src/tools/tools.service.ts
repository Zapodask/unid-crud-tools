import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tool } from '../db/models/tool.entity';
import { CreateDto } from './dto/create.dto';
import { ResponsePaginate } from './dto/response.paginated.dto';

@Injectable()
export class ToolsService {
  public constructor(
    @InjectRepository(Tool) public readonly toolsRepository: Repository<Tool>,
  ) {}

  // Buscar todas as ferramentas
  async findAll(
    tag?: string,
    page = 1,
    perPage = 10,
  ): Promise<ResponsePaginate> {
    // Caso seja null
    page = page || 1;
    perPage = perPage || 10;

    const options = {
      take: perPage,
      skip: (page - 1) * perPage,
      where: {},
    };

    // Adicionar a pesquisa caso haja tag
    if (tag) {
      options['where']['tags'] = [tag];
    }

    const [tools, total] = await this.toolsRepository.findAndCount(options);

    const res = {
      data: tools,
      pagination: {
        page: page,
        lastPage: Math.ceil(total / perPage),
        perPage: perPage,
        total: total,
      },
    };

    return res;
  }

  // Criar ferramenta
  async create(data: CreateDto) {
    const tool = await this.toolsRepository.create({
      title: data.title,
      link: data.link,
      description: data.description,
      tags: data.tags,
    });

    let save = {} as Tool;

    try {
      save = await this.toolsRepository.save(tool);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        throw new ConflictException('title já cadastrado');
      }
    }

    return save;
  }

  // Buscar uma ferramenta
  async findOne(id: number): Promise<Tool> {
    const tool = await this.toolsRepository.findOne(id);

    if (!tool) {
      throw new NotFoundException('ferramenta não encontrada');
    }

    return tool;
  }

  // Deletar ferramenta
  async delete(id: number): Promise<object> {
    const tool = await this.toolsRepository.delete(id);

    if (tool.affected !== 1) {
      throw new NotFoundException('ferramenta não encontrada');
    }

    return {};
  }
}
