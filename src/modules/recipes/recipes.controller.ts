import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, Logger } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchByIngredientDto, SearchRecipeDto } from './dto/search-recipe-dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RecipeResponseDto } from './dto/response/recipe-response.dto';
import { PaginatedRecipesDto } from './dto/response/paginated-recipe-response.dto';
import type { Request } from 'express';

@ApiTags('Recipes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  private readonly logger = new Logger(RecipesController.name);
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiOperation({ summary: 'Create recipe' })
  @ApiBody({ type: CreateRecipeDto })
  @ApiCreatedResponse({ type: RecipeResponseDto })
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all recipes' })
  @ApiOkResponse({ type: [RecipeResponseDto] })
  findAll() {
    return this.recipesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search recipes by title (paginated)' })
  @ApiOkResponse({ type: PaginatedRecipesDto })
  search(@Query() query: SearchRecipeDto) {
    this.logger.log(`Searching recipes with query: ${query.query}`);
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.recipesService.search(query.query, page, limit);
  }

  @Get('by-ingredient')
  @ApiOperation({ summary: 'List recipes that contain given ingredients (paginated)' })
  @ApiOkResponse({ type: PaginatedRecipesDto })
  filterByIngredient(@Query() query: SearchByIngredientDto, @Req() req: Request) {
    const userId = (req as any)?.user?.id;
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    let ingredientIds: number[] = [];
    if (typeof query.ingredientIds === 'string') {
      ingredientIds = query.ingredientIds
        .split(',')
        .map(id => Number(id.trim()))
        .filter(id => !isNaN(id) && id > 0);
    } else if (Array.isArray(query.ingredientIds)) {
      ingredientIds = query.ingredientIds.map(Number).filter(id => !isNaN(id) && id > 0);
    }

    return this.recipesService.findByIngredients(ingredientIds, page, limit, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get recipe by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: RecipeResponseDto })
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update recipe' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateRecipeDto })
  @ApiOkResponse({ type: RecipeResponseDto })
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete recipe' })
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ description: 'Recipe deleted' })
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
