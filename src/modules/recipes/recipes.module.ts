import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe } from './entities/recipe.entity';
import { Difficulty } from 'src/database/entities/difficulty.entity';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { Instruction } from './entities/instructions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, Difficulty, Instruction]), 
    IngredientsModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [TypeOrmModule],
})
export class RecipesModule {}
