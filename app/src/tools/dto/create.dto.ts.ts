import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateDto {
  @Field(() => String)
  @IsString()
  readonly title: string;

  @Field(() => String)
  @IsString()
  readonly link: string;

  @Field(() => String)
  @IsString()
  readonly description: string;

  @Field(() => [String])
  @IsString({ each: true })
  readonly tags: string[];
}
