import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Recipe } from '../recipes/entities/recipe.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(user: Partial<User>): Promise<User> {
    if (!user.password) {
      throw new Error('Password must be provided');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = this.usersRepository.create({ ...user, password: hashedPassword });
    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateData);
    return this.findOne(id) as Promise<User>;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addFavorite(userId: number, recipeId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favoriteRecipes'],
    });

    const recipe = await this.recipeRepository.findOne({ where: { id: recipeId } });

    if (!user || !recipe) throw new NotFoundException('Usuário ou receita não encontrado');

    const alreadyFavorited = user.favoriteRecipes.some(r => r.id === recipeId);
    if (alreadyFavorited) return user;

    user.favoriteRecipes.push(recipe);
    return this.usersRepository.save(user);
  }

  async removeFavorite(userId: number, recipeId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favoriteRecipes'],
    });

    if (!user) throw new NotFoundException('Usuário ou receita não encontrado');

    user.favoriteRecipes = user.favoriteRecipes.filter(r => r.id !== recipeId);
    return this.usersRepository.save(user);
  }

  async getFavorites(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favoriteRecipes'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user.favoriteRecipes;
  }
}
