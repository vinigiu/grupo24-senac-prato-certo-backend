import { ApiProperty } from '@nestjs/swagger';
import { IngredientResponseDto } from './ingredients-response.dto';

export class RecipeIngredientResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ type: IngredientResponseDto })
  ingredient: IngredientResponseDto;

  @ApiProperty({ example: 200 })
  quantity: number;

  @ApiProperty({ example: 'g', required: false })
  unit?: string;
}