import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { LlmService } from './llm.service'
import { RunQueryDto } from './dto/run-query.dto'
import { QueryResponseDto } from './dto/query-response.dto'

@Controller('llm')
@ApiTags('LLM')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('query')
  @ApiOperation({ summary: 'Run a query on the LLM' })
  @ApiResponse({
    status: 200,
    description: 'Query response',
    type: QueryResponseDto,
  })
  async runQuery(
    @Body(ValidationPipe) runQueryDto: RunQueryDto
  ): Promise<QueryResponseDto> {
    const response = this.llmService.runQuery(
      runQueryDto.prompt,
      runQueryDto.maxTokens
    )
    return { response }
  }
}
