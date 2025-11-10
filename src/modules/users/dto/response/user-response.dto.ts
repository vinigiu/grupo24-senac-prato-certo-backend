import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Maria Silva' })
  name: string;

  @ApiProperty({ example: 'maria@example.com' })
  email: string;

  @ApiProperty({ example: 'public/images/foto.jpg', required: false })
  image?: string;

  @ApiProperty({ example: false })
  vegan: boolean;

  @ApiProperty({ example: false })
  vegetarian: boolean;

  @ApiProperty({ example: false })
  gluten: boolean;

  @ApiProperty({ example: false })
  dairy: boolean;

  @ApiProperty({ example: false })
  nuts: boolean;
}