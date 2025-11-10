import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { Difficulty } from 'src/database/entities/difficulty.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(Difficulty)
    private difficultyRepository: Repository<Difficulty>,
  ) {}

  async create(recipeData: CreateRecipeDto): Promise<Recipe> {
    if (!recipeData.difficultyId) {
      throw new Error('Difficulty must be provided');
    }

    if (!recipeData.instructions || recipeData.instructions.length === 0) {
      throw new Error('At least one instruction must be provided');
    }

    if (!recipeData.recipeIngredients || recipeData.recipeIngredients.length === 0) {
      throw new Error('At least one recipe ingredient must be provided');
    }

    const difficulty = await this.difficultyRepository.findOneBy({ id: recipeData.difficultyId });

    if (!difficulty) {
      throw new Error(`Difficulty with id ${recipeData.difficultyId} not found`);
    }

    const recipe = this.recipesRepository.create({
      ...recipeData,
      title: recipeData.title,
      estimatedTime: recipeData.estimatedTime,
      image: recipeData.image,
      difficulty,
      instructions: recipeData.instructions,
      recipeIngredients: recipeData.recipeIngredients
    });

    const createdRecipe: Recipe = await this.recipesRepository.save(recipe);
    return createdRecipe;
  }

  findAll() {
    return this.recipesRepository.find({ relations: ['difficulty', 'instructions', 'recipeIngredients'] });
  }

  findOne(id: number) { 
    return this.recipesRepository.findOne({
      where: { id },
      relations: ['difficulty', 'instructions', 'recipeIngredients'],
    });
  }

  update(id: number, updateData: UpdateRecipeDto) {
    return this.recipesRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.recipesRepository.delete(id);
  }
}