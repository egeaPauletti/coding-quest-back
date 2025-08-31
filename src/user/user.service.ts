import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { UserDto } from './dto/user.dto';

    @Injectable()
    export class UserService{
        constructor(private readonly prisma: PrismaService) { }
        async create(data: UserDto) {
            const user = await this.prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: await bcrypt.hash(data.password, 10),
                }
            });
            console.log(data);
            return user;
        }
    };

