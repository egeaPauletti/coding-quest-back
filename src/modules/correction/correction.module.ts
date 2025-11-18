import { Module } from '@nestjs/common';
import { CorrectionController } from './correction.controller';
import { CorrectionService } from './correction.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [CorrectionController],
  providers: [CorrectionService, PrismaService],
})
export class CorrectionModule { }
