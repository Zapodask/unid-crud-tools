import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

@InputType()
export class CreateDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'title é necessário' })
  @IsString({ message: 'title é uma string' })
  @ApiProperty()
  readonly title: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'link é necessário' })
  @IsString({ message: 'link é uma string' })
  @ApiProperty()
  readonly link: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'description é necessário' })
  @IsString({ message: 'description é uma string' })
  @ApiProperty()
  readonly description: string;

  @Field(() => [String])
  @IsNotEmpty({ message: 'tags é necessário' })
  @IsString({ each: true, message: 'tags é um array de strings' })
  @ArrayNotEmpty({ message: 'tags não pode ser vazio' })
  @ApiProperty()
  readonly tags: string[];
}
