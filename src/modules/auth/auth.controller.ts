import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return access + refresh tokens' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    console.log(body)
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using a refresh token' })
  @ApiBody({ type: RefreshDto })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired refresh token' })
  async refresh(@Body() body: RefreshDto): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verify(body.refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      return this.authService.login({
        id: payload.sub,
        email: payload.username,
        role: payload.role,
      } as any);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}