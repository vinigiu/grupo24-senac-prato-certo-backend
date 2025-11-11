import { IsInt, IsNumberString, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchRecipeDto {
  @IsString()
  query: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class SearchByIngredientDto {
  @ApiProperty({
    description:
      'IDs dos ingredientes separados por vírgula (ex: "1,2,3") ou múltiplos parâmetros (ingredientIds=1&ingredientIds=2)',
    example: '1,2,3',
  })
  @IsString({ each: true })
  ingredientIds: string | string[];

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: number;
}
