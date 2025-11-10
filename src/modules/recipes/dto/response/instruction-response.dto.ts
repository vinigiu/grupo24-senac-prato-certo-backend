import { ApiProperty } from '@nestjs/swagger';

export class InstructionResponseDto {
  @ApiProperty({ example: 1 })
  sequence: number;

  @ApiProperty({ example: 'Lave bem o arroz.' })
  text: string;
}