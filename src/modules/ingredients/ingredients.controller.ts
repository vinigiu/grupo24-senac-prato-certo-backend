import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IngredientResponseDto } from './dto/response/ingredient-response.dto';
import { PaginatedIngredientsDto } from './dto/response/paginated-ingredient-response.dto';
import { UserIngredientResponseDto } from './dto/response/user-ingredient-response.dto';
import type { Request } from 'express';

@ApiTags('Ingredients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create ingredient' })
  @ApiBody({ type: CreateIngredientDto })
  @ApiCreatedResponse({ type: IngredientResponseDto })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  @ApiOperation({ summary: 'List ingredients (paginated)' })
  @ApiOkResponse({ type: PaginatedIngredientsDto })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get('user-recent')
  @ApiOperation({ summary: 'Get 5 most recent searched ingredients for the authenticated user' })
  @ApiOkResponse({ type: [UserIngredientResponseDto] })
  getRecentUserIngredients(@Req() req: Request) {
    const userId = (req as any)?.user?.id;
    return this.ingredientsService.findRecentUserIngredients(Number(userId));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ingredient by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: IngredientResponseDto })
  findOne(@Param('id') id: string) {
    return this.ingredientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update ingredient' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateIngredientDto })
  @ApiOkResponse({ type: IngredientResponseDto })
  update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientsService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete ingredient' })
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ description: 'Ingredient deleted' })
  remove(@Param('id') id: string) {
    return this.ingredientsService.remove(+id);
  }
}
