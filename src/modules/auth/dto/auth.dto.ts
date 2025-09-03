import { IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class JwtPayload {
  @IsString()
  sub: string;
  @IsString()
  email: string;
  @IsString()
  role?: string;
}
