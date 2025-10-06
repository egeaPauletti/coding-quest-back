import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/database/prisma.module';
import { UserModule } from './modules/user/user.module';
import { CorrectionModule } from './correction/correction.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, CorrectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
