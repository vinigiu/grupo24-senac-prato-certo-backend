import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FavoriteRecipeDto } from './dto/response/favorite-recipe-response.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { PaginatedUsersDto } from './dto/response/paginated-users-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List users (paginated)' })
  @ApiOkResponse({ type: PaginatedUsersDto })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: UserResponseDto })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UserResponseDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ description: 'User deleted' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/favorites/:recipeId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add recipe to user favorites' })
  @ApiParam({ name: 'userId' })
  @ApiParam({ name: 'recipeId' })
  @ApiOkResponse({ type: FavoriteRecipeDto })
  async addFavorite(
    @Param('userId') userId: number,
    @Param('recipeId') recipeId: number,
  ) {
    return this.usersService.addFavorite(userId, recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/favorites/:recipeId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove recipe from favorites' })
  @ApiParam({ name: 'userId' })
  @ApiParam({ name: 'recipeId' })
  @ApiOkResponse({ description: 'Favorite removed' })
  async removeFavorite(
    @Param('userId') userId: number,
    @Param('recipeId') recipeId: number,
  ) {
    return this.usersService.removeFavorite(userId, recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/favorites')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user favorite recipes' })
  @ApiParam({ name: 'userId' })
  @ApiOkResponse({ type: [FavoriteRecipeDto] })
  async getFavorites(@Param('userId') userId: number) {
    return this.usersService.getFavorites(userId);
  }
}
