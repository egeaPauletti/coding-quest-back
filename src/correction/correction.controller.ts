import { Controller, Post, Body } from '@nestjs/common';
import { CorrectionService } from './correction.service';
import { IsString } from 'class-validator';

export class CreateCorrectionDto {
  @IsString()
  userId: string;

  @IsString()
  challenge: string;

  @IsString()
  code: string;

  @IsString()
  expectedOutput: string;
}

@Controller('correction')
export class CorrectionController {
  constructor(private readonly correctionService: CorrectionService) {}

  @Post()
  async createCorrection(@Body() body: CreateCorrectionDto) {
    const { userId, code, challenge, expectedOutput } = body;
    const result = await this.correctionService.correctExercise(
      userId,
      challenge,
      code,
      expectedOutput,
    );
    return result;
  }
}
