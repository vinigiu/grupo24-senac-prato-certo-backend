import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { Difficulty } from 'src/database/entities/difficulty.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(Difficulty)
    private difficultyRepository: Repository<Difficulty>,
  ) {}

  async create(recipeData: Partial<Recipe>): Promise<Recipe> {
    if (!recipeData.difficulty || !recipeData.difficulty.id) {
      throw new Error('Difficulty must be provided');
    }

    if (!recipeData.instructions || recipeData.instructions.length === 0) {
      throw new Error('At least one instruction must be provided');
    }

    if (!recipeData.recipeIngredients || recipeData.recipeIngredients.length === 0) {
      throw new Error('At least one recipe ingredient must be provided');
    }

    const difficulty = await this.difficultyRepository.findOneBy({ id: recipeData.difficulty.id });

    if (!difficulty) {
      throw new Error(`Difficulty with id ${recipeData.difficulty.id} not found`);
    }

    const recipe = this.recipesRepository.create({
      ...recipeData,
      difficulty,
      instructions: recipeData.instructions,
      recipeIngredients: recipeData.recipeIngredients
    });

    return this.recipesRepository.save(recipe);
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

  update(id: number, updateData: Partial<Recipe>) {
    return this.recipesRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.recipesRepository.delete(id);
  }
}