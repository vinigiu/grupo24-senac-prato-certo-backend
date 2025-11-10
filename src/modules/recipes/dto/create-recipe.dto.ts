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
  @IsInt()
  @Min(1)
  sequence: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  recipeId: number;
}

export class CreateRecipeIngredientDto {
  @IsInt()
  @IsPositive()
  ingredientId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantity: number;

  @IsString()
  @IsOptional()
  unit?: string;
}

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  estimatedTime: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsInt()
  @IsPositive()
  difficultyId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateInstructionDto)
  instructions: CreateInstructionDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeIngredientDto)
  recipeIngredients: CreateRecipeIngredientDto[];
}
