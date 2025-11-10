import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserIngredient } from './entities/userIngredients.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(UserIngredient)
    private readonly userIngredientRepository: Repository<UserIngredient>,
  ) {}
  
  create(createIngredientDto: CreateIngredientDto) {
    return this.ingredientRepository.save(createIngredientDto);
  }

  findAll() {
    return this.ingredientRepository.find();
  }

  findOne(id: number) {
    return this.ingredientRepository.findOne({ where: { id } });
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientRepository.update(id, updateIngredientDto);
  }

  remove(id: number) {
    return this.ingredientRepository.delete(id);
  }

  async findRecentUserIngredients(userId: number) {
    if (!Number.isInteger(userId) || userId <= 0) {
      return [];
    }

    const items = await this.userIngredientRepository.find({
      where: { user: { id: userId } },
      relations: ['ingredient'],
      order: { searchedAt: 'DESC' },
      take: 5,
    });

    return items.map(i => ({
      id: i.id,
      ingredient: i.ingredient,
      searchedAt: i.searchedAt?.toISOString?.() ?? i.searchedAt,
    }));
  }
}
