import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'Maria Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'maria@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'public/images/foto.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  vegan?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  vegetarian?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  gluten?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  dairy?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  nuts?: boolean;
}
