import { ApiProperty } from '@nestjs/swagger';

export class IngredientResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Arroz' })
  name: string;

  @ApiProperty({ example: true })
  vegan: boolean;

  @ApiProperty({ example: true })
  vegetarian: boolean;

  @ApiProperty({ example: false })
  gluten: boolean;

  @ApiProperty({ example: false })
  dairy: boolean;

  @ApiProperty({ example: false })
  nuts: boolean;
}