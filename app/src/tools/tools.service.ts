import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tool } from '../db/models/tool.entity';
import { CreateDto } from '../tools/dto/create.dto.ts';

@Injectable()
export class ToolsService {
  public constructor(
    @InjectRepository(Tool) public readonly toolsRepository: Repository<Tool>,
  ) {}

  // Buscar todas as ferramentas
  findAll(): Promise<Tool[]> {
    return this.toolsRepository.find();
  }

  // Criar ferramenta
  create(data: CreateDto) {
    const tool = this.toolsRepository.create({
      title: data.title,
      link: data.link,
      description: data.description,
      tags: data.tags,
    });

    return this.toolsRepository.save(tool);
  }

  // Buscar uma ferramenta
  findOne(id: number): Promise<Tool> {
    return this.toolsRepository.findOne(id);
  }

  // Deletar ferramenta
  delete(id: number): string {
    this.toolsRepository.delete(id);

    return `${id} deleted`;
  }
}
