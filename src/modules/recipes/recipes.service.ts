import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { Difficulty } from 'src/database/entities/difficulty.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeIngredient } from '../ingredients/entities/recipeIngredients.entity';
import { UserIngredient } from '../ingredients/entities/userIngredients.entity';

@Injectable()
export class RecipesService {
  private readonly logger = new Logger(RecipesService.name);
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(Difficulty)
    private difficultyRepository: Repository<Difficulty>,
    @InjectRepository(UserIngredient)
    private userIngredientRepository: Repository<UserIngredient>,
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

  async search(query: string, page = 1, limit = 10) {
    let q = (query ?? '').toString().trim();
    if (!q) {
      return { data: [], total: 0, page, limit };
    }

    if (q.length > 100) q = q.slice(0, 100);

    const escapeLike = (s: string) => s.replace(/([%_\\])/g, '\\$1');
    const escaped = escapeLike(q);
    const qParam = `%${escaped}%`;

    const qb = this.recipesRepository.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.difficulty', 'difficulty')
      .leftJoinAndSelect('recipe.instructions', 'instruction')
      .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
      .leftJoinAndSelect('ri.ingredient', 'ingredient')
      .where('recipe.title ILIKE :q', { q: qParam })
      .orderBy('recipe.title', 'ASC');

    const total = await qb.getCount();
    const items = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { data: items, total, page, limit };
  }

  async findByIngredient(ingredientId: number, page = 1, limit = 10, userId?: number) {
    const id = Number(ingredientId);
    if (!Number.isInteger(id) || id <= 0) {
      return { data: [], total: 0, page, limit };
    }

    if (userId && Number.isInteger(Number(userId)) && Number(userId) > 0) {
      try {
        const ui = this.userIngredientRepository.create({
          user: { id: Number(userId) } as any,
          ingredient: { id } as any,
          searchedAt: new Date(),
        });
        await this.userIngredientRepository.save(ui);
      } catch (err) {
        this.logger.error(err);
      }
    }

    const qb = this.recipesRepository.createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.difficulty', 'difficulty')
      .leftJoinAndSelect('recipe.instructions', 'instruction')
      .leftJoinAndSelect('recipe.recipeIngredients', 'ri')
      .leftJoinAndSelect('ri.ingredient', 'ingredient')
      .where(qb => {
        const sub = qb.subQuery()
          .select('1')
          .from(RecipeIngredient, 'ri_sub')
          .where('ri_sub.recipe_id = recipe.id AND ri_sub.ingredient_id = :ingredientId')
          .getQuery();
        return `EXISTS ${sub}`;
      })
      .setParameter('ingredientId', id)
      .orderBy('recipe.title', 'ASC');

    const total = await qb.getCount();
    const items = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return { data: items, total, page, limit };
  }
}