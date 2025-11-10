import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { Difficulty } from 'src/database/entities/difficulty.entity';
import { Instruction } from './instructions.entity';
import { RecipeIngredient } from 'src/modules/ingredients/entities/recipeIngredients.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'estimated_time' })
  estimatedTime: number;

  @Column()
  image: string;

  @ManyToOne(() => Difficulty, { eager: true })
  @JoinColumn({ name: 'difficulty_id' })
  difficulty: Difficulty;

  @OneToMany(() => Instruction, (instruction) => instruction.recipe, { cascade: true })
  instructions: Instruction[];

  @OneToMany(() => RecipeIngredient, (ri) => ri.recipe, { cascade: true })
  recipeIngredients: RecipeIngredient[];

  @ManyToMany(() => User, (user) => user.favoriteRecipes)
  favoritedBy: User[];

  @Column({ default: 0 })
  output: number;
}