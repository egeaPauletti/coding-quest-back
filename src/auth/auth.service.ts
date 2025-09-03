import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(data: AuthDto) {
    return this.prisma.user.findUnique({
      where: { email: data.email },
    });
  }

  async signIn(data: AuthDto) {
    const user = await this.findByEmail(data);

    // Verifica se o usuário existe
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Compara a senha enviada com o hash no banco
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida');
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload);
    console.log('Login bem-sucedido:', user, '\n', { Token: accessToken });

    return {
      accessToken,
    };
  }
}
