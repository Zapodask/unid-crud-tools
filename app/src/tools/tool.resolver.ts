import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ToolsService } from './tools.service';
import { Tool } from '../db/models/tool.entity';
import { CreateDto } from './dto/create.dto';

@Resolver()
export class ToolResolver {
  constructor(private readonly toolService: ToolsService) {}

  // Buscar todas as ferramentas
  @Query(() => [Tool])
  public async getTools(
    @Args('tag', { defaultValue: '' }) tag?: string,
    @Args('page', { nullable: true }) page?: number,
    @Args('perPage', { nullable: true }) perPage?: number,
  ): Promise<Tool[]> {
    const { data } = await this.toolService.findAll(tag, page, perPage);

    return data;
  }

  // Buscar uma ferramenta
  @Query(() => Tool, { nullable: true })
  public async getTool(@Args('id') id: number): Promise<Tool> {
    return this.toolService.findOne(id);
  }

  // Criar ferramenta
  @Mutation(() => Tool)
  public async createTool(@Args('data') data: CreateDto): Promise<Tool> {
    const tool = this.toolService.create({
      title: data.title,
      link: data.link,
      description: data.description,
      tags: data.tags,
    });
    return tool;
  }
}
