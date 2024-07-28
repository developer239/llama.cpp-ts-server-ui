import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsOptional, MinLength, Min, Max } from 'class-validator'

export class StreamQueryDto {
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
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(1000)
  maxTokens?: number
}
