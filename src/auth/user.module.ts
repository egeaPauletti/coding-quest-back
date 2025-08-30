import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers:[UserController],
    providers:[UserService,PrismaModule]

})
export class UserModule {
}
