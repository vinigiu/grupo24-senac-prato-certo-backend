import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredient } from 'src/modules/ingredients/entities/recipeIngredients.entity';
import { Ingredient } from './entities/ingredient.entity';
import { UserIngredient } from './entities/userIngredients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, RecipeIngredient, UserIngredient])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [TypeOrmModule],
})
export class IngredientsModule {}
