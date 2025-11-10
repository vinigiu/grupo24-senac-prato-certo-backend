import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class SearchRecipeDto {
  @ApiProperty({ example: 'frango' })
  @IsString()
  query: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class SearchByIngredientDto {
  @ApiProperty({ example: 2 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  ingredientId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}