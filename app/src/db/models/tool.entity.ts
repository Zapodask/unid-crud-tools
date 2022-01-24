import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'tools' })
export class Tool {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Field(() => String)
  @Column('text')
  @ApiProperty()
  title: string;

  @Field(() => String)
  @Column('text')
  @ApiProperty()
  link: string;

  @Field(() => String)
  @Column('text')
  @ApiProperty()
  description: string;

  @Field(() => [String])
  @Column('text', { array: true })
  @ApiProperty()
  tags: string[];

  @Field()
  @CreateDateColumn({ name: 'created_at', select: false })
  @ApiProperty()
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', select: false })
  @ApiProperty()
  updatedAt: Date;
}
