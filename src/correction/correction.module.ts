import { Module } from '@nestjs/common';
import { CorrectionService } from './correction.service';
import { CorrectionController } from './correction.controller';
import { PrismaService } from '../modules/database/prisma.service';

@Module({
  controllers: [CorrectionController],
  providers: [CorrectionService, PrismaService],
})
export class CorrectionModule {}
