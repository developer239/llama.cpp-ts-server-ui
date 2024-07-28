import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsInt,
  IsOptional,
  MinLength,
  Min,
  Max,
} from 'class-validator'

export class RunQueryDto {
  @ApiProperty({
    description: 'The prompt to send to the LLM',
    example: 'Tell me a story about a brave knight.',
  })
  @IsString()
  @MinLength(1)
  prompt: string

  @ApiProperty({
    description: 'Maximum number of tokens to generate',
    example: 100,
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(1000)
  maxTokens?: number
}
