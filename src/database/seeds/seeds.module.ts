import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Difficulty } from '../entities/difficulty.entity';
import { Ingredient } from 'src/modules/ingredients/entities/ingredient.entity';
import * as bcrypt from 'bcrypt';
import { Recipe } from 'src/modules/recipes/entities/recipe.entity';
import { CreateInstructionDto, CreateRecipeDto } from 'src/modules/recipes/dto/create-recipe.dto';

@Module({
  imports: [TypeOrmModule.forFeature([User, Difficulty, Ingredient, Recipe])],
})
export class SeedModule implements OnModuleInit {
  private readonly logger = new Logger(SeedModule.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Difficulty)
    private readonly difficultyRepository: Repository<Difficulty>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
    await this.seedDifficulties();
    await this.seedIngredients();
    await this.seedRecipes();
  }

  private async seedUsers() {
    const count = await this.userRepository.count();
    if (count > 0) return;

    const user = this.userRepository.create({
      name: 'Admin',
      email: 'admin@pratocerto.com',
      password: bcrypt.hashSync('admin', 10),
      favoriteRecipes: [],
      image: 'public/images/foto.jpg',
      vegan: false,
      vegetarian: false,
      gluten: false,
      dairy: false,
      nuts: false,
    });

    await this.userRepository.save(user);
    this.logger.log('Usuário admin criado com sucesso');
  }

  private async seedDifficulties() {
    const difficulties = ['Fácil', 'Médio', 'Difícil'];

    for (const name of difficulties) {
      const exists = await this.difficultyRepository.findOne({ where: { name } });
      if (!exists) {
        await this.difficultyRepository.save(this.difficultyRepository.create({ name }));
      }
    }

    this.logger.log('Dificuldades inseridas');
  }

  private async seedIngredients() {
        const count = await this.ingredientRepository.count();
    if (count > 0) {
      this.logger.log('🌱 Ingredients already seeded — skipping.');
      return;
    }

    const ingredientsData: Partial<Ingredient>[] = [
      { name: 'Arroz', vegan: true, vegetarian: true, gluten: false, dairy: false, nuts: false },
      { name: 'Feijão', vegan: true, vegetarian: true, gluten: false, dairy: false, nuts: false },
      { name: 'Carne bovina', vegan: false, vegetarian: false, gluten: false, dairy: false, nuts: false },
      { name: 'Frango', vegan: false, vegetarian: false, gluten: false, dairy: false, nuts: false },
      { name: 'Leite', vegan: false, vegetarian: true, gluten: false, dairy: true, nuts: false },
      { name: 'Queijo', vegan: false, vegetarian: true, gluten: false, dairy: true, nuts: false },
      { name: 'Ovo', vegan: false, vegetarian: true, gluten: false, dairy: false, nuts: false },
      { name: 'Amendoim', vegan: true, vegetarian: true, gluten: false, dairy: false, nuts: true },
      { name: 'Farinha de trigo', vegan: true, vegetarian: true, gluten: true, dairy: false, nuts: false },
      { name: 'Batata', vegan: true, vegetarian: true, gluten: false, dairy: false, nuts: false },
      { name: 'Cenoura', vegan: true, vegetarian: true, gluten: false, dairy: false, nuts: false },
      { name: 'Tomate', vegan: true, vegetarian: true, gluten: false, dairy: false, nuts: false },
      { name: 'Azeite de oliva', vegan: true, vegetarian: true, gluten: false, dairy: false, nuts: false },
      { name: 'Manteiga', vegan: false, vegetarian: true, gluten: false, dairy: true, nuts: false },
      { name: 'Soja', vegan: true, vegetarian: true, gluten: false, dairy: false, nuts: false },
    ];

    await this.ingredientRepository.save(ingredientsData);
    this.logger.log('✅ Ingredients seeded successfully!');
  }

  private async seedRecipes() {
    const count = await this.recipeRepository.count();
    if (count > 0) {
      this.logger.log('🌱 Recipes already seeded — skipping.');
      return;
    }

    const easyDifficulty = await this.difficultyRepository.findOne({ where: { name: 'Fácil' } });
    const mediumDifficulty = await this.difficultyRepository.findOne({ where: { name: 'Médio' } });

    if (!easyDifficulty || !mediumDifficulty) {
      this.logger.error('Dificuldade não encontrada. Certifique-se de que as dificuldades foram semeadas primeiro.');
      return;
    }

    const riceAndBeansInstructions = [
      { sequence: 1, text: 'Lave o arroz e o feijão separadamente.' },
      { sequence: 2, text: 'Cozinhe o feijão em água fervente até ficar macio.' },
      { sequence: 3, text: 'Em outra panela, refogue alho e cebola no azeite.' },
      { sequence: 4, text: 'Adicione o arroz e refogue por alguns minutos.' },
      { sequence: 5, text: 'Adicione água ao arroz e cozinhe até ficar macio.' },
      { sequence: 6, text: 'Sirva o arroz com o feijão cozido.' },
    ];

    const chickenInstructions = [
      { sequence: 1, text: 'Tempere o frango com sal e pimenta.' },
      { sequence: 2, text: 'Aqueça uma grelha e cozinhe o frango por 6-7 minutos de cada lado.' },
      { sequence: 3, text: 'Sirva com legumes grelhados.' },
    ];

    const riceAndBeansIngredients = await this.ingredientRepository.find({
      where: { name: In(['Arroz', 'Feijão']) },
    });

    const chickenIngredients = await this.ingredientRepository.find({
      where: { name: In(['Frango']) },
    });

    if (riceAndBeansIngredients.length < 2 || chickenIngredients.length < 1) {
      this.logger.error('Ingredientes necessários para as receitas não foram encontrados. Certifique-se de que os ingredientes foram semeados primeiro.');
      return;
    }

    const recipesData = [
      {
        title: 'Arroz com Feijão',
        estimatedTime: 30,
        instructions: riceAndBeansInstructions,
        difficulty: mediumDifficulty,
        recipeIngredients: [
          { ingredient: riceAndBeansIngredients.find(i => i.name === 'Arroz'), quantity: 200, unit: 'g' },
          { ingredient: riceAndBeansIngredients.find(i => i.name === 'Feijão'), quantity: 150, unit: 'g' },
        ],
        image: 'https://sabores-new.s3.amazonaws.com/public/2024/11/arroz-e-feijao-1024x494.webp',
      },
      {
        title: 'Frango Grelhado',
        estimatedTime: 30,
        instructions: chickenInstructions,
        difficulty: easyDifficulty,
        recipeIngredients: [
          { ingredient: chickenIngredients[0], quantity: 200, unit: 'g' },
        ],
        image: 'https://img.cybercook.com.br/imagens/receitas/340/file-de-frango-grelhado-2-840x480.jpeg?q=75',
      },
    ];

    const recipesEntities = this.recipeRepository.create(recipesData);
    await this.recipeRepository.save(recipesEntities);
    this.logger.log('✅ Recipes seeded successfully!');
  }
}
