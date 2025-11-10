import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchByIngredientDto, SearchRecipeDto } from './dto/search-recipe-dto';

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get('search')
  search(@Query() query: SearchRecipeDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.recipesService.search(query.query, page, limit);
  }

  @Get('by-ingredient')
  filterByIngredient(@Query() query: SearchByIngredientDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.recipesService.findByIngredient(query.ingredientId, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
