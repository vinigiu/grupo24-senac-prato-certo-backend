import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.password) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Senha inválida');
        }

        const { password: _pwd, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
}
