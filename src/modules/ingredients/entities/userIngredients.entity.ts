import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('user_ingredients')
export class UserIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userIngredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, {
    eager: true,
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column({ name: 'searched_at'})
  searchedAt: Date;
}