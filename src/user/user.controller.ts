// src/user/user.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put,UseGuards,UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginUserDto: { email: string, password: string }): Promise<{ token: string }> {
    const user = await this.userService.validateUser(loginUserDto.email, loginUserDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return JWT token
    const token = 'your_jwt_token_generation_logic'; // Replace with actual JWT token generation
    return { token };
  }

  @Get('protected')
  @UseGuards(AuthGuard('defaultStrategy')) // This guard will ensure that only authenticated requests can access this endpoint
  getProtectedData(): string {
    return 'This is protected data';
  }

  @Post()
  async create(@Body() createUserDto: User): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: User): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
}
