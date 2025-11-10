import { ApiProperty } from '@nestjs/swagger';
import { InstructionResponseDto } from './instruction-response.dto';
import { RecipeIngredientResponseDto } from './recipe-ingredients-response.dto';

class DifficultyMiniDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Fácil' })
  name: string;
}

export class RecipeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Arroz e Feijão' })
  title: string;

  @ApiProperty({ example: 30 })
  estimatedTime: number;

  @ApiProperty({ example: 'https://.../image.jpg' })
  image: string;

  @ApiProperty({ type: DifficultyMiniDto })
  difficulty: DifficultyMiniDto;

  @ApiProperty({ type: [InstructionResponseDto] })
  instructions: InstructionResponseDto[];

  @ApiProperty({ type: [RecipeIngredientResponseDto] })
  recipeIngredients: RecipeIngredientResponseDto[];

  @ApiProperty({ example: 0 })
  output: number;
}