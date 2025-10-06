import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../modules/database/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class CorrectionService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY não definida!');
    }
    this.openai = new OpenAI({ apiKey });
  }

  private async callOpenAI(
    userCode: string,
    expectedOutput: string,
    challenge: string,
  ): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `
              Responda apenas se esta correto ou errado`,
          },
          {
            role: 'user',
            content: `Desafio do aluno:\n${challenge}\n Código do aluno:\n${userCode}\n\nResultado esperado:\n${expectedOutput}\n\n`,
          },
        ],
        max_tokens: 200,
        temperature: 0,
      });

      const messageContent =
        response.choices?.[0]?.message?.content ?? 'Sem feedback';
      return String(messageContent);
    } catch (err: unknown) {
      console.error('Erro ao chamar OpenAI:', err);
      return 'Não foi possível gerar feedback no momento.';
    }
  }

  async correctExercise(
    userId: string,
    userCode: string,
    expectedOutput: string,
    challenge: string,
  ) {
    try {
      const feedback = await this.callOpenAI(
        userCode,
        expectedOutput,
        challenge,
      );

      const correction = await this.prisma.correction.create({
        data: { userId, code: userCode, expectedOutput, feedback },
      });

      return correction;
    } catch (err: unknown) {
      console.error('Erro completo ao salvar correção:', err);
      throw new InternalServerErrorException(
        'Não foi possível salvar a correção.',
      );
    }
  }
}
