import { ApiProperty } from '@nestjs/swagger'

export class QueryResponseDto {
  @ApiProperty({ description: 'The response from the LLM' })
  response: string
}
