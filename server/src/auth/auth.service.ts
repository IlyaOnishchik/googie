import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { CartsService } from 'src/carts/carts.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private cartsService: CartsService
    ) {}

    async login(credentials: AuthCredentialsInput): Promise<string> {
        const { email, password } = credentials;
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new UnauthorizedException('User not found!');
        const isMatch = bcrypt.compareSync(password, user.passwordHash);
        if (!isMatch) throw new UnauthorizedException('Wrong password!');
        const payload: JwtPayload = { id: user.id, email: user.email, roles: user.roles };
        return this.jwtService.sign(payload);
    }

    async register(credentials: AuthCredentialsInput): Promise<string> {
        const { email, password } = credentials;
        const candidate = await this.usersService.findOneByEmail(email);
        if (candidate) throw new ConflictException('User with this email already exists!');
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = new User();
        user.email = email;
        user.passwordHash = hashedPassword;
        const newUser = await this.usersService.create(user);
        await this.cartsService.create(user);
        const payload: JwtPayload = { id: newUser.id, email: newUser.email, roles: user.roles };
        return this.jwtService.sign(payload);
    }
}
