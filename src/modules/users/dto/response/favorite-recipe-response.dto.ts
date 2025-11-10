import { ApiProperty } from '@nestjs/swagger';

export class FavoriteRecipeDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Frango Grelhado' })
  title: string;

  @ApiProperty({ example: 'https://.../frango.jpg' })
  image: string;
}