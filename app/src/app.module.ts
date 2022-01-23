import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormOptions from './config/orm';

import { ToolsModule } from './tools/tools.module';
import { ToolResolver } from './tools/tool.resolver';

@Module({
  imports: [
    // Typeorm config
    TypeOrmModule.forRootAsync({
      useFactory: () => ormOptions,
    }),

    // Graphql config
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),

    // Modules
    ToolsModule,

    // Graphql resolvers
    ToolResolver,
  ],
})
export class AppModule {}
