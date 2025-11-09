import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecipeIngredient } from 'src/modules/ingredients/entities/recipeIngredients.entity';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  vegan: boolean;

  @Column()
  vegetarian: boolean;

  @Column()
  gluten: boolean;

  @Column()
  dairy: boolean;

  @Column()
  nuts: boolean;

  @OneToMany(() => RecipeIngredient, (ri) => ri.ingredient)
  recipeIngredients: RecipeIngredient[];
}