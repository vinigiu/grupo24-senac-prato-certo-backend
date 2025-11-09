import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/favorites/:recipeId')
  async addFavorite(
    @Param('userId') userId: number,
    @Param('recipeId') recipeId: number,
  ) {
    return this.usersService.addFavorite(userId, recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/favorites/:recipeId')
  async removeFavorite(
    @Param('userId') userId: number,
    @Param('recipeId') recipeId: number,
  ) {
    return this.usersService.removeFavorite(userId, recipeId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/favorites')
  async getFavorites(@Param('userId') userId: number) {
    return this.usersService.getFavorites(userId);
  }
}
