import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

@InputType()
export class CreateDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'title é necessário' })
  @IsString({ message: 'title é uma string' })
  readonly title: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'link é necessário' })
  @IsString({ message: 'link é uma string' })
  readonly link: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'description é necessário' })
  @IsString({ message: 'description é uma string' })
  readonly description: string;

  @Field(() => [String])
  @IsNotEmpty({ message: 'tags é necessário' })
  @IsString({ each: true, message: 'tags é um array de strings' })
  @ArrayNotEmpty({ message: 'tags não pode ser vazio' })
  readonly tags: string[];
}
