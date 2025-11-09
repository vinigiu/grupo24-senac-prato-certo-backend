import { UserIngredient } from 'src/modules/ingredients/entities/userIngredients.entity';
import { Recipe } from 'src/modules/recipes/entities/recipe.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  image: string;

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

  @OneToMany(() => UserIngredient, (ui) => ui.user, { cascade: true })
  userIngredients: UserIngredient[];

  @ManyToMany(() => Recipe, (recipe) => recipe.favoritedBy)
  @JoinTable({
    name: 'user_favorites',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'recipe_id', referencedColumnName: 'id' },
  })
  favoriteRecipes: Recipe[];
}
