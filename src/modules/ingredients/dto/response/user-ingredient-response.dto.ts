import { ApiProperty } from '@nestjs/swagger';
import { IngredientResponseDto } from './ingredient-response.dto';

export class UserIngredientResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ type: IngredientResponseDto })
  ingredient: IngredientResponseDto;

  @ApiProperty({ example: '2025-11-10T14:00:00.000Z' })
  searchedAt: string;
}