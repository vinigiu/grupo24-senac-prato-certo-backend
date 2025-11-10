import { ApiProperty } from '@nestjs/swagger';
import { IngredientResponseDto } from './ingredient-response.dto';

export class PaginatedIngredientsDto {
  @ApiProperty({ type: [IngredientResponseDto] })
  data: IngredientResponseDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}