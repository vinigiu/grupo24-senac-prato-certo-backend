import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateInstructionDto {
  @ApiProperty({ example: 1, description: 'Ordem da instrução' })
  @IsInt()
  @Min(1)
  sequence: number;

  @ApiProperty({ example: 'Picar a cebola e refogar.' })
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class CreateRecipeIngredientDto {
  @ApiProperty({ example: 2, description: 'ID do ingrediente existente' })
  @IsInt()
  @IsPositive()
  ingredientId: number;

  @ApiProperty({ example: 200, description: 'Quantidade' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @ApiPropertyOptional({ example: 'g', description: 'Unidade (opcional)' })
  @IsString()
  @IsOptional()
  unit?: string;
}

export class CreateRecipeDto {
  @ApiProperty({ example: 'Frango Grelhado' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 30, description: 'Tempo estimado em minutos' })
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  estimatedTime: number;

  @ApiProperty({ example: 'https://.../image.jpg' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @ApiProperty({ example: 1, description: 'ID da dificuldade existente' })
  @IsInt()
  @IsPositive()
  difficultyId: number;

  @ApiProperty({ type: [CreateInstructionDto], description: 'Lista de instruções' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateInstructionDto)
  instructions: CreateInstructionDto[];

  @ApiProperty({ type: [CreateRecipeIngredientDto], description: 'Lista de ingredientes da receita' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeIngredientDto)
  recipeIngredients: CreateRecipeIngredientDto[];
}
