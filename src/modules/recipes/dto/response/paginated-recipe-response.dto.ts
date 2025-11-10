import { ApiProperty } from '@nestjs/swagger';
import { RecipeResponseDto } from './recipe-response.dto';

export class PaginatedRecipesDto {
  @ApiProperty({ type: [RecipeResponseDto] })
  data: RecipeResponseDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}